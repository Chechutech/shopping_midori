import { useEffect, useReducer } from "react";
import { productItem, children } from "../interfaces/interfaces";
import { CartContext } from "./CartContext";

const initialState: productItem[] = [];
type CartActionType =
    | { type: "[CART] Add one item to Cart"; payload: productItem }
    | { type: "[CART] Add one quantity item"; payload: string }
    | { type: "[CART] Remove one quantity item"; payload: string }
    | { type: "[CART] Remove item from Cart"; payload: string }
    | { type: "[CART] Clear Cart" };

export const CartProvider = ({ children }: children) => {
    const shoppingReducer = (
        state: productItem[],
        action: CartActionType
    ): productItem[] => {
        switch (action.type) {
            case "[CART] Add one item to Cart": {
                const isItemInCart = state.find(
                    (item) => item.code === action.payload.code
                );
                if (isItemInCart) {
                    if (isItemInCart.quantity! < action.payload.stock) {
                        return state.map((item) =>
                            item.code === action.payload.code
                                ? { ...item, quantity: (item.quantity || 1) + 1 }
                                : item
                        );
                    }
                    return state;
                }
                return [...state, { ...action.payload, quantity: 1 }];
            }

            case "[CART] Add one quantity item": {
                const isItemInCart = state.find((item) => item.code === action.payload);
                if (isItemInCart && isItemInCart.quantity! < isItemInCart.stock) {
                    return state.map((item) =>
                        item.code === action.payload
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    );
                }
                return state;
            }

            case "[CART] Remove one quantity item":
                return state.map((item) =>
                    item.code === action.payload
                        ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
                        : item
                );

            case "[CART] Remove item from Cart":
                return state.filter((cart) => cart.code !== action.payload);

            case "[CART] Clear Cart":
                return [];

            default:
                return state;


        }
    };

    const [cartList, dispatch] = useReducer(shoppingReducer, initialState);

    const addToCart = (cart: productItem) => {
        const action: CartActionType = {
            type: "[CART] Add one item to Cart",
            payload: { ...cart, quantity: 1 },
        };
        dispatch(action);
    };
    const addOneQuantity = (code: string) => {
        const action: CartActionType = {
            type: "[CART] Add one quantity item",
            payload: code,
        };
        dispatch(action);
    };
    const removeOneQuantity = (code: string) => {
        const action: CartActionType = {
            type: "[CART] Remove one quantity item",
            payload: code,
        };
        dispatch(action);
    };
    const removeFromCart = (code: string) => {
        const action: CartActionType = {
            type: "[CART] Remove item from Cart",
            payload: code,
        };
        dispatch(action);
    };

    const clearCartList = () => {
        const action: CartActionType = {
            type: "[CART] Clear Cart",

        };
        dispatch(action);
    }
    useEffect(() => {
        console.log("Updated cartList:", cartList);
    }, [cartList]);

    return (
        <CartContext.Provider
            value={{
                cartList,
                addToCart,
                addOneQuantity,
                removeOneQuantity,
                removeFromCart,
                clearCartList,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

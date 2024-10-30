import { useState } from "react";
import { cartItemProps } from "../../interfaces/interfaces"
import { IMAGE_NOT_FOUND, isImageProduct } from "../../helpers/imageProduct";

export const CartList: React.FC<cartItemProps> = ({ itemCart, removeOneQuantity, removeFromCart, addOneQuantity }) => {
    const [isImage, setIsImage] = useState(() => isImageProduct(itemCart.images));
    
    const handleOneQuantity = () => {
        removeOneQuantity(itemCart.code);
    };
    const handleAddOneCart = () => {
        addOneQuantity(itemCart.code);
    };
    const handleRemoveFromCart = () => {
        removeFromCart(itemCart.code);
    };
    const handleURLImage = () => {
        setIsImage(IMAGE_NOT_FOUND);
      };
    return (

        <li className="cart-item" key={itemCart.code}>
            <img src={isImage} className="" alt={itemCart.name} onError={handleURLImage} />
            <div className="quantity-icons">
                <p>{itemCart.name}</p>
                <div className="quantity-icons-btn">
                    <button onClick={handleOneQuantity}>-</button>
                    <p>{itemCart.quantity}</p>
                    <button onClick={handleAddOneCart}>+</button>
                </div>
            </div>
            <div className="precio-btn">
                <span onClick={handleRemoveFromCart}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </span>
                <p>{itemCart.prices.salesPrice.value}€</p>
            </div>
        </li>
    )
}

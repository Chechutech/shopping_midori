import { useContext } from "react";
import { ProductCard } from "../productCard/ProductCard";
import "./ProductsDisplay.css";
import { CartContext } from "../../contex/CartContext";
import { ProductsContext } from "../../contex/ProductsContext";
import { productItem } from "../../interfaces/interfaces";

const useCart = () => useContext(CartContext);

export default function ProductsDisplays() {
  const products = useContext(ProductsContext);
  const { cartList, addToCart, removeFromCart } = useCart();

  const handleAdd = (cart: productItem) => {
    addToCart(cart);
  };

  const handleRemove = (code: string) => {
    removeFromCart(code);
  };

  return (
    <div className="productList-display">

        {products.map((product) => (
          <ProductCard
            key={product.code}
            {...product}
            cartList={cartList}
            handleAdd={() => handleAdd(product)}
            handleRemove={() => handleRemove(product.code)}
          />
        ))}
     
    </div>
  );
}

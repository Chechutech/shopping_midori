import { useContext, useState } from "react";
import { CartContext } from "../../contex/CartContext";
import "./Cart.css";
import { CartList } from "./CartList";
import { productItem } from "../../interfaces/interfaces";
import { ModalConfirmation } from "./ModalConfirmation";


const useCart = () => useContext(CartContext);

export const Cart: React.FC = () => {
  const { cartList, removeFromCart, addOneQuantity, removeOneQuantity, clearCartList } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };



  const totalCart = () => {
    return cartList
      .reduce(
        (totalCart, cart) =>
          totalCart + cart.prices.salesPrice.value * (cart.quantity || 1),
        0
      )
      .toFixed(2);
  };
  const totalItems = () => {
    return cartList.reduce((total, cart) => total + (cart.quantity || 1), 0);
  };
  const handleBuyNow = () => {
    setIsOpenModal(true);
    setIsOpen(false)
  }
  const handleModalClose = () => {
    setIsOpen(false);
    setIsOpenModal(false);
    clearCartList();

  }


  return (
    <div className="cart down">
      <div className={`cart-container ${isOpen ? "open" : ""}`}>
        <h3>Your Shopping Cart</h3>
        <ul className="cart-list">
          {cartList.length > 0 ? (
            cartList.map((itemCart: productItem) => (
              <CartList itemCart={itemCart} key={itemCart.code} removeOneQuantity={() => removeOneQuantity(itemCart.code)} addOneQuantity={() => addOneQuantity(itemCart.code)} removeFromCart={() => removeFromCart(itemCart.code)} />
            ))
          ) : (
            <p className="product-list-notAvail">Empty</p>
          )}
        </ul>
        <div className="total-section">
          <hr />
          <strong>Total:</strong>
          <div className="price-quantity">
            <p>(You have {totalItems()} Products)</p>
            <p>{totalCart()}€</p>
          </div>
          <button type="button" disabled={cartList.length === 0} onClick={handleBuyNow}>Buy now</button>

        </div>
      </div>
      <div className="cart-summary">
        <strong>You have ({totalItems()} Products)</strong>
        <button className="btn-open" onClick={toggleCart}>
          {isOpen ? "Close " : "Open your Cart"}
        </button>
      </div>
      <ModalConfirmation isOpen={isOpenModal} closeBtn={handleModalClose} />
    </div>
  );
};

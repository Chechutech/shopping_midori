import "./App.css";
import { Cart } from "./components/cart/Cart";
import ProductsDisplays from "./components/productsDisplays/ProductsDisplays";
import { CartProvider } from "./contex/CartProvider";
import { ProductsProvider } from "./contex/ProductsProvider";

export const App = () => {
  return (
    <ProductsProvider>
      <CartProvider>
        <main className="app-container">
          <h2>Midori Shopping Cart</h2>
          <section className="cart-page-container">
            <ProductsDisplays />
            <Cart />
          </section>
        </main>
      </CartProvider>
    </ProductsProvider>
  );
}

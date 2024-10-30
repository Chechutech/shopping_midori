import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Cart } from "./Cart";
import { CartProvider } from "../../contex/CartProvider";

test("testing if the cart starts empty", () => {
  render(
    <CartProvider>
      <Cart />
    </CartProvider>
  );
  const startEmptyCart = screen.getByText(/Open your Cart/i);
  expect(startEmptyCart).toBeInTheDocument();
});

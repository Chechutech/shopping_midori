import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductsProvider } from "../../contex/ProductsProvider";
// import ProductsDisplays from "./ProductsDisplays";
import { App } from "../../App";

test("show product list", () => {
  render(
    <ProductsProvider>
      <App />
    </ProductsProvider>
  );

  const oneProduct = screen.getByText(/Midori Shopping Cart/i);
  expect(oneProduct).toBeInTheDocument();
});

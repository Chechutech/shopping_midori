import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { it, describe, expect, vi } from "vitest";
import { ProductCard } from "./ProductCard";

import { productCardProps } from "../../interfaces/interfaces";

const product: productCardProps = {
  code: "1",
  name: "testName",
  supplier: "supplier",
  dosageForm: "dosafeForm",
  baseprice: 12,
  packagingSize: "packagingSize",
  stock: 10,
  images: [],
  prices: {
    salesPrice: { value: 3, formattedValue: "34" },
    recommendedRetailPrice: { value: 2.2, formattedValue: "34" },
  },
  handleAdd: vi.fn(),
  handleRemove: vi.fn(),
  cartList: [],
};

describe("ProductCard", () => {
  it("add a product when the button is clicked", () => {
    render(
      <ProductCard
        {...product}
        cartList={[]}
        handleAdd={product.handleAdd}
        handleRemove={product.handleRemove}
      />
    );
    const addToCart = screen.getByRole("button", { name: "+" });
    fireEvent.click(addToCart);
    expect(product.handleAdd).toHaveBeenCalledWith({
      code: "1",
      name: "testName",
      supplier: "supplier",
      dosageForm: "dosafeForm",
      baseprice: 12,
      packagingSize: "packagingSize",
      stock: 10,
      images: [],
      prices: {
        salesPrice: { value: 3, formattedValue: "34" },
        recommendedRetailPrice: { value: 2.2, formattedValue: "34" },
      },
    });
  });
});

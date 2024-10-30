import { useEffect, useState } from "react";
import { productItem, children } from "../interfaces/interfaces";
import { ProductsContext } from "./ProductsContext";

// const URL =
//   "https://file.notion.so/f/f/853f6bec-ed43-4dca-a48e-2a5f6657fe98/38d3f633-2c6d-4652-abf0-79a782786475/products.json?table=block&id=a0cbcc7c-5fcc-4ab8-befe-a16cf89f6f61&spaceId=853f6bec-ed43-4dca-a48e-2a5f6657fe98&expirationTimestamp=1724407200000&signature=dArUcepLj49pEwnGep654xTz0pKH0JMjviHd8ZDqtGw&downloadName=products.json";

const URL= "http://localhost:3000/api/products"

export const ProductsProvider = ({ children }: children) => {
  const [products, setProducts] = useState<productItem[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(URL);
      //WITHOUT THE API
      // const convertedToText = await response.text();
      // const convertedData = `[${convertedToText}]`;
      // // const data: productItem[] = JSON.parse(convertedData);
      const data: productItem[] = await response.json()
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

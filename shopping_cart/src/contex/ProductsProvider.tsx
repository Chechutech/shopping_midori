import { useEffect, useState } from "react";
import { productItem, children } from "../interfaces/interfaces";
import { ProductsContext } from "./ProductsContext";
 


const URL= "http://localhost:8000/api/products"


export const ProductsProvider = ({ children }: children) => {
  const [products, setProducts] = useState<productItem[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Fetching products failed",${response.status}`)
      }
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

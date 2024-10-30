import { createContext } from "react";
import { productItem } from "../interfaces/interfaces";


export const ProductsContext = createContext<productItem[]>([]);
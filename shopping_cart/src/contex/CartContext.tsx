import { createContext } from "react";
import {cartValuesContext} from "../interfaces/interfaces"

export const CartContext = createContext<cartValuesContext>({} as cartValuesContext);
export interface imageResUrl {
  url: string;
}
export interface imagesFormats {
  jpg: {
    resolutions: {
      "1x": imageResUrl;
      "2x": imageResUrl;
    };
  };
}
export interface imageProduct {
  id: number;
  meta: {
    tags: string[];
  };
  variants: {
    [key: string]: {
      formats: imagesFormats;
      width: number;
      height: number;
    };
  };
}

export interface productItem {
  code: string;
  name: string;
  supplier: string;
  dosageForm: string;
  baseprice: number;
  prices: {
    salesPrice: {
      value: number;
      formattedValue: string;
    };
    recommendedRetailPrice: {
      value: number;
      formattedValue: string;
    };
  };
  packagingSize: string;
  images: imageProduct[];
  quantity?: number;
  stock: number;
}
export interface productCardProps extends productItem {
  cartList: productItem[];
  handleAdd: (cart: productItem) => void;
  handleRemove: (code: string) => void;
}

export interface cartValuesContext {
  cartList: productItem[];
  addToCart: (cart: productItem) => void;
  addOneQuantity: (code: string) => void;
  removeOneQuantity: (code: string) => void;
  removeFromCart: (code: string) => void;
  clearCartList: () => void;
}

export interface cartItemProps {
  itemCart: productItem;

  addOneQuantity: (code: string) => void;
  removeOneQuantity: (code: string) => void;
  removeFromCart: (code: string) => void;
}

export interface children {
  children: JSX.Element | JSX.Element[];
}

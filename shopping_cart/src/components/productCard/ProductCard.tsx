import { useEffect, useState } from "react";
import { productCardProps } from "../../interfaces/interfaces";
import "./ProductCard.css";
import { isImageProduct, IMAGE_NOT_FOUND } from "../../helpers/imageProduct";



export const ProductCard: React.FC<productCardProps> = ({
  code,
  name,
  supplier,
  dosageForm,
  baseprice,
  prices,
  packagingSize,
  stock,
  handleAdd,
  cartList,
  images,
}) => {
  const [isStock, setIsStock] = useState(stock);
  
  const [isImage, setIsImage] = useState(() => isImageProduct(images));
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const isInCart = cartList.find((item) => item.code === code);
    const newStock = isInCart ? stock - isInCart.quantity! : stock;
    if (newStock !== isStock) {
      setIsStock(newStock);
    }
  }, [cartList, code, stock]);

  const handleURLImage = () => {
    setIsImage(IMAGE_NOT_FOUND);
  };
  const handleLiked = () => { 
    setLiked((prev) => !prev);
  };
  const addOneBtn = () => {
    handleAdd({
      code,
      name,
      supplier,
      dosageForm,
      baseprice,
      prices,
      packagingSize,
      stock,
      images,
    });
    
  };

  const ifOutofStock = isStock == null || isStock <= 0;
  return (
    <div className="card-container">
      <div className="card-img-container">
        <img className="img-card" src={isImage} onError={handleURLImage}  />
        <button type="button" className="like-icon" onClick={handleLiked}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={liked ? "#1f1c2e" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#1f1c2e"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
      <div className="product-info">
        <p className="product-name">{name}</p>
        <div className="product-info-packagin">
          <span>
            {packagingSize} &#8226; {dosageForm}
          </span>
          <p>{supplier}</p>
        </div>

        <p className="product-price">
          {prices.salesPrice.value} €
          <span>{prices.recommendedRetailPrice.value} €</span>
        </p>
        <p className="product-info-packagin">{baseprice}</p>
      </div>
      <div className="price-stock">
        <p>{isStock > 0 ? ` Stock: ${isStock}` : ""}</p>
        {ifOutofStock ? (
          <button type="button" className="out-of-stock-btn" disabled>
            Out of stock
          </button>
        ) : (
          <button type="button" onClick={addOneBtn} className="add-cart-btn">
            +
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          
          </button>
        )}
      </div>
    </div>
  );
};

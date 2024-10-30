import { imageProduct } from "../interfaces/interfaces";
import imageNotFound from "../../src/assets/images/image-not-found.jpg";

export const IMAGE_NOT_FOUND = imageNotFound;

export const isImageProduct = (images: imageProduct[]) => {
  
  if (images.length === 0) {
    return IMAGE_NOT_FOUND;
  }
  const firstImageCard =  images[0];
  const imageCard = firstImageCard?.variants?.[140].formats?.jpg?.resolutions?.["2x"]?.url;
  
    return imageCard ?? IMAGE_NOT_FOUND;
  };
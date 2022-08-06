import Rating from "@mui/material/Rating";
import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "small",
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="card">
        <div className="product_img">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <div className="product_text">
          <h6>{product.name.slice(0, 70)}</h6>
          <div>
            <Rating {...options} />
            <span className="productCardSpan">
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <p>{`$ ${product.price}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

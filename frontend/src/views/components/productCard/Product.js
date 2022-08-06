import Rating from "@mui/material/Rating";
import React from "react";
import { Link } from "react-router-dom";
import "./Product.scss";

const Product = ({ product }) => {
  const options = {
    value: product && product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "small",
  };

  return (
    <Link className="product" to={`/product/${product._id}`}>
      <div className="product_info">
        <p>{product && product.name}</p>
        <p className="product_price">
          <strong>{`$ ${product?.price}`}</strong>
        </p>

        <div className="product_rating">
          <Rating {...options} />
          <span className="productCardSpan">
            ({product && product.numOfReviews} Reviews)
          </span>
        </div>
      </div>
      <img src={product && product.images[0].url} alt={product?.name} />
      <button>Buy Now</button>
    </Link>
  );
};

export default Product;

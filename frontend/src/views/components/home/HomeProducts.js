import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./HomeProducts.scss";

import { Link } from "react-router-dom";
//
import {
  clearErrors,
  getHomeProduct,
} from "../../../redux/actions/productAction";
import Loader from "../common/Loader/Loader";
import Product from "../productCard/Product";
import ProductCard from "../productCard/ProductCard";
import { useAlert } from "react-alert";

const HomeProducts = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getHomeProduct());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <div className="home">
        <div className="home_container">
          <h2 className="homeHeading">HOT GADGETS</h2>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="home_row">
                {products &&
                  products
                    .slice(0, 2)
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
              </div>
              <div className="home_row">
                {products &&
                  products
                    .slice(3, 6)
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
              </div>
              <div className="home_row">
                {products &&
                  products
                    .slice(12, 13)
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
              </div>
              <div className="seeMore">
                <Link to="/products">See More</Link>
              </div>

              <h2 className="homeHeading">Featured Products</h2>
              <div className="homeProducts">
                <div className="pd">
                  {products &&
                    products
                      .slice(6, 18)
                      .map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                </div>
                <div className="seeMore">
                  <Link to="/products">See More</Link>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default HomeProducts;

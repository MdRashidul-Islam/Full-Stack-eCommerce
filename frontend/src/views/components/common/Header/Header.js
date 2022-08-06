import SearchIcon from "@mui/icons-material/Search";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import HorizontalSplitIcon from "@mui/icons-material/HorizontalSplit";
import logo from "../../../../assets/images/logo.png";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  // search
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      console.log(keyword.trim());
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="header">
      <div className="header_logo">
        <Link to="/">
          <img className="header_logo" src={logo} alt="" />
        </Link>
      </div>

      <div className={user ? "header_search gap" : "header_search no_user_gap"}>
        <form onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
            className="header_searchIn"
          />
          <button type="submit">
            <SearchIcon className="header_searchIcon" />
          </button>
        </form>
      </div>

      {/* nav link start */}

      <input type="checkbox" id="toggle-menu" />

      <div className="header_nav">
        {user && user.role === "admin" && (
          <Link to="/admin">
            <div className="header_option hide">
              <span className="header_optionLineOne">Admin</span>
              <span className="header_optionLineTwo">Dashboard</span>
            </div>
          </Link>
        )}

        <Link to="/products">
          <div className="header_option hide">
            <span className="header_optionLineOne">All</span>
            <span className="header_optionLineTwo">Products</span>
          </div>
        </Link>

        {user && (
          <Link to="/orders">
            <div
              className={
                user ? "header_option hide space" : "header_option hide"
              }
            >
              <span className="header_optionLineOne">Returns</span>
              <span className="header_optionLineTwo">& Orders</span>
            </div>
          </Link>
        )}
      </div>
      {!user && (
        <Link to={!user && "/login"}>
          <div className="header_option">
            <span className="header_optionLineOne">Hello, Guest</span>
            <span className="header_optionLineTwo">Sign In</span>
          </div>
        </Link>
      )}

      <label htmlFor="toggle-menu" className="toggle">
        <HorizontalSplitIcon className="barsIcon" />
      </label>
    </div>
  );
};

export default Header;

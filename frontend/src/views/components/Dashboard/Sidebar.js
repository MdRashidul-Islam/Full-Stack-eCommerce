import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo1.png";
import "./sidebar.scss";

import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link to="product">
        <p>
          <AddIcon />
          Create Product
        </p>
      </Link>
      <Link to="products">
        <p>
          <PostAddIcon />
          All Product
        </p>
      </Link>

      <Link to="orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;

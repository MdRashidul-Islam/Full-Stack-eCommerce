import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../common/Loader/Loader";
import MetaData from "../common/MetaData";
import "./Profile.scss";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />

          <div className="profile">
            <h1>My Profile</h1>
            <div className="profileContainer">
              <div className="left">
                <img src={user.avatar.url} alt={user.name} /> <br />
                <Link to="/account/update">Edit Profile</Link>
              </div>
              <div className="right">
                <div>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>

                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>

                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>

                <div className="link">
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

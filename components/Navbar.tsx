import { NextPage } from "next";
import React, { useState } from "react";
import cookie from "js-cookie";

const Navar: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [userImage, setUserImage] = useState(
    "https://images.vexels.com/media/users/3/136558/isolated/lists/43cc80b4c098e43a988c535eaba42c53-person-user-icon.png"
  );

  function handleChange(event) {
    setSearchText(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  const cookieFromSession = cookie.get("fewlines");

  const logoutUser = async () => {
    cookie.remove("fewlines", { path: "/" });
    await fetch("/api/logout?usersToken=" + cookieFromSession);
  };
  const currentUserCover = async () => {

    await fetch("/api/userPhoto?usersToken=" + cookieFromSession, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((result) => result.json())
      .then((resu) => {
        setUserImage(resu);
      });
  };
  return (
    <>
      <div className="Nav">
        <nav className="row">
          <div className="itemNavbar col-3">
            <a href="/home"><img className="logoNav" src="../logocarre.png" /></a>
          </div>
          <div className="itemNavbar col-6">
            <div className="SearchBar d-flex" onSubmit={(e) => handleSubmit(e)}>
              <input
                onChange={handleChange}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-warning" type="submit">
                <a href={`/search/${searchText}`}>
                  <i className="fa fa-search"></i>
                </a>
              </button>
            </div>
          </div>
          <div className="itemNavbar col-3">
            <div
              
              style={{ width: 200, height: 200, textAlign: "center" }}
            >
              <a href="/profile">
                <img
                  style={{ width: 114, height: 114, textAlign: "center", paddingTop:20 }}
                  src={
                    userImage
                      ? userImage
                      : "https://images.vexels.com/media/users/3/136558/isolated/lists/43cc80b4c098e43a988c535eaba42c53-person-user-icon.png"
                  }
                />
              </a>
              <div className="card-body">
                <div className="card-text">
                  {cookieFromSession ? (
                    <p onClick={() => logoutUser()}>
                      <a href="/" className="LogLink">
                        Logout
                      </a>
                    </p>
                  ) : (
                    <a href="/">Login</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navar;

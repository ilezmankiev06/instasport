import { NextPage, GetServerSideProps } from "next";
import initClient from "../utils/initClient";
import React, { useEffect, useState } from "react";
//import { getUserByCookie } from "../utils/initDatabase";
import cookies from "next-cookies";
import { serialize } from "v8";
//import { useRouter } from "next/router";

//const Navar: React.FC = (props: any) => {
const Navar: NextPage = (props: any) => {
  const [searchText, setSearchText] = useState("");

  const searchInDB = async () => {
    // const data = searchText;

    // await fetch("/api/search").then((res) => {
    //   console.log("recherche api route", res);
    //   res.json();
    // });
    const data = {
      UserName: searchText,
    };
    await fetch("/api/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  function handleChange(event) {
    setSearchText(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  // const isLogged: any = async (cookie: string) => {
  //   await fetch("/api/islogged").then((res) => res.json());
  // };
  // isLogged(props.cookie);
  return (
    <>
      <div className="Nav">
        <nav className="row">
          <div className="itemNavbar col-3">
            <img className="logoNav" src="../logocarre.png" />
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
              <button
                className="btn btn-warning"
                type="submit"
                onClick={() => searchInDB()}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="itemNavbar col-3">
            <img
              className="photoNav"
              //key={props.user.id ? props.user.id : ""}
              //src={props.user.Cover ? props.user.Cover : "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"}
              src="https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
              alt=""
            />
            {/* {(props.user && props.user.id) ? <a href="/">Logout</a> : <a href={props.url}>Login</a> }
    <p>{(props.user && props.user.userName) ? props.user.userName : ""}</p> */}
          </div>
        </nav>
        <p>{props.context}</p>
      </div>
    </>
  );
};

export default Navar;

/////////////////////////
/// serverSideProps ////
////////////////////////
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("juste context", context);
  // const c = cookies(context).fewlines;
  // let currentUser;

  // console.log("🟢", currentUser);
  // console.log("cookie", c);
  // const urlToSignIn = await initClient().getAuthorizationURL();

  return {
    props: {
      // cookie: c,
      context: context,
    },
  };
};

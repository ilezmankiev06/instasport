import React from "react";
import { NextPage, GetServerSideProps } from "next";
import initClient from "../utils/initClient";
//import { getUserByCookie } from "../utils/initDatabase";
import cookies from "next-cookies";
//import { useRouter } from "next/router";

//const Navar: React.FC = (props: any) => {
const Navar: NextPage = (props: any) => {
  console.log("tototototototo", props.context);
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
            <div className="SearchBar d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>
          <div className="itemNavbar col-3">
            <img
              className="photoNav"
              src="https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
              alt=""
            />
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

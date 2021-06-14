import React, { useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import Layout from "../../components/Layout";

const UserProfil: NextPage = (props: any) => {
  const [userInfo, setUserInfo] = useState(null);

  const categoriesImgDescription = [
    "Football",
    "BasketBall",
    "Ping-pong",
    "Tennis",
    "Rugby",
    "Swimming",
    "Volley-Ball",
    "Badminton",
    "Baseball",
  ];

  useEffect(() => {
    searchUserInDB();
  }, [userInfo]);

  const searchUserInDB = async () => {
    const user = fetch("/api/searchbyid?searchId=" + props.userId)
      .then((res) => res.json())
      .then((user) => {
        setUserInfo(user);
      });
  };
  return (
    <Layout>
      <div className="container " style={{ paddingTop: 200 }}>
        <div className="page-inscription">
          <div className="container profilePhotoEdit">
            <div className="row">
              <div className="col-5"></div>
              <div className="col-2">
                <div className="card" style={{ width: 200, height: 200 }}>
                  <img
                    className="image-profil"
                    src={
                      userInfo
                        ? userInfo.Cover
                        : "https://images.vexels.com/media/users/3/136558/isolated/lists/43cc80b4c098e43a988c535eaba42c53-person-user-icon.png"
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-5"></div>
          </div>
        </div>
        <div className="container">
          <div>
            <div className="row row-cols-1 row-cols-sm-2">
              <div className="colIncription col">
                <label htmlFor="exampleInputUserName" className="form-label">
                  UserName
                </label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  id="exampleInputEmail"
                  placeholder={userInfo ? userInfo.userName : null}
                />
                <label htmlFor="exampleInputUserName" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  id="exampleInputEmail"
                  placeholder={userInfo ? userInfo.email : null}
                />
                <label htmlFor="exampleInputBirthDate" className="form-label">
                  Birthdate
                </label>
                <input
                  type="text"
                  name="trip-start"
                  min="1921-01-01"
                  max="2003-12-31"
                  disabled
                  className="form-control"
                  id="exampleInputBirthDate"
                  aria-describedby="emailHelp"
                  placeholder={userInfo ? userInfo.Birthdate : null}
                />
              </div>
              <div className="col">
                <h6
                  className="titre-interests text-center"
                  style={{ marginTop: 120 }}
                >
                  Favorite sports :
                </h6>
                <div className="container">
                  <div className="row row-cols-3 ">
                    <ul style={{ marginLeft: 250 }}>
                      {userInfo && userInfo.Groups
                        ? userInfo.Groups.map((value, index) => {
                            if (value) {
                              return (
                                <div>
                                  <li>
                                    <p>{categoriesImgDescription[index]}</p>
                                  </li>
                                </div>
                              );
                            }
                          })
                        : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            .form-check-input {
              background-color: #fbe23b;
              color: black;
            }
          `}</style>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfil;

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      userId: context.query.userid,
    },
  };
};

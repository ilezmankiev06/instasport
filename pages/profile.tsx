import { NextPage, GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Checkbox from "../components/checkBox";
import { getUserByCookie, getSportCategories } from "../utils/initDatabase";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Inscription: NextPage<{
  categoriesImgArray;
  currentUsersEmail;
  currentUsersName;
  currentUserCover;
  currentUsersBirthdate;
  categoriesImgDescription;
  currentUsersCategories;
  currentUserId;
}> = ({
  categoriesImgArray,
  currentUsersEmail,
  currentUsersName,
  currentUserCover,
  currentUsersBirthdate,
  categoriesImgDescription,
  currentUsersCategories,
  currentUserId,
}) => {

  //useRouter
  const router = useRouter();

  ///////////////////////////
  /////// useState /////////
  //////////////////////////
  const [userName, setUserName] = useState(currentUsersName);
  const [birthdate, setBirthdate] = useState(currentUsersBirthdate);
  const [usersEmail, setUsersEmail] = useState(currentUsersEmail);
  const [errorMessage, setErrorMessage] = useState(null);
  const [counterOfSelectedCategories, setCounterOfSelectedCategories] =
    useState(0);
  const [active, setActive] = useState(currentUsersCategories);

  const [photosPost, setphotosPost] = useState(null);
  const [textPost, settextPost] = useState(null);
  const [groupId, setgroupId] = useState(null);
  const [postTitle, setpostTitle] = useState(null);

  ///////////////////////////
  /////// useEffect ////////
  //////////////////////////
  useEffect(() => {
    console.log(groupId);
    console.log(usersEmail);
  }, [
    userName,
    birthdate,
    active,
    usersEmail,
    groupId,
    photosPost,
    postTitle,
    textPost,
  ]);

  ///////////////////////////
  ////// registerForm //////
  //////////////////////////
  const registerform = async () => {
    const data = {
      email1: currentUsersEmail,
      email2: usersEmail,
      userName: userName,
      active: active,
      birthdate: birthdate,
    };
    await fetch("/api/registerform", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "ERROR") {
          setErrorMessage(
            "Erreur d'inscription, veuillez verifier votre adresse mail"
          );
        } else {
          router.push("/home");
        }
      });
  };
  const createPost = async () => {
    const data = {
      id: 0,
      userId: currentUserId,
      datePost: Date(),
      photosPost: photosPost,
      textPost: textPost,
      likePost: [],
      commentsPost: [],
      groupId: parseInt(groupId),
      postTitle: postTitle,
    };
    await fetch("/api/createpost", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "ERROR") {
          setErrorMessage(
            "Erreur d'inscription, veuillez verifier votre adresse mail"
          );
        } else {
          router.push("/home");
        }
      });
  };

  /////////////////////////
  ////// Affichage ///////
  ////////////////////////
  return (
    <Layout>
    <div className="container " style={{paddingTop: 200}}>
      <div className="page-inscription">
        <div className="container profilePhotoEdit">
          <div className="row">
            <div className="col-5"></div>
            <div className="col-2">
              <div className="card" style={{ width: 200, height: 200 }}>
                <img
                  className="image-profil"
                  src={
                    currentUserCover
                      ? currentUserCover
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
                  className="form-control"
                  id="exampleInputEmail"
                  placeholder="UserName"
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
                <label htmlFor="exampleInputUserName" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail"
                  placeholder="Email"
                  value={usersEmail}
                  onChange={(event) => {
                    setUsersEmail(event.target.value);
                  }}
                />
                <label htmlFor="exampleInputBirthDate" className="form-label">
                  Birthdate
                </label>
                <input
                  type="Date"
                  name="trip-start"
                  min="1921-01-01"
                  max="2003-12-31"
                  className="form-control"
                  id="exampleInputBirthDate"
                  aria-describedby="emailHelp"
                  placeholder="BirthDate"
                  value={birthdate}
                  onChange={(event) => {
                    setBirthdate(event.target.value);
                  }}
                />
              </div>
              <div className="col">
                <h6 className="titre-interests text-center">
                  My favorite sports :
                </h6>
                <div className="container">
                  <div className="row row-cols-3">
                    {categoriesImgArray.map((imageOfCategory, index) => {
                      return (
                        <div
                          className="imageInterest col text-center"
                          key={index}
                        >
                          <img
                            className="imageCircle"
                            src={imageOfCategory}
                            width="70"
                            height="70"
                            title={categoriesImgDescription[index]}
                          />
                          <Checkbox
                            id={index}
                            active={active}
                            setActive={setActive}
                            counterOfSelectedCategories={
                              counterOfSelectedCategories
                            }
                            setCounterOfSelectedCategories={
                              setCounterOfSelectedCategories
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div>
                  {active.map((value, index) => {
                    return <div key={"tata" + index}>{value}</div>;
                  })}
                </div>
                <button
                  type="submit"
                  className="Boutton btn bouton-update-profil"
                  onClick={() => registerform()}
                >
                  Update
                </button>
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
      <div className="container d-flex justify-content-center">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="darker container-post" style={{ width: 450, height: 600 }}>
              <div className="card-title text-center"><br></br><h4>Create a post</h4></div>
              <div className="card-body">
                <label htmlFor="exampleInputBirthDate" className="form-label">
                  Photo*
                </label>
                <input
                  type="text"
                  value={photosPost}
                  onChange={(event) => {
                    setphotosPost(event.target.value);
                  }}
                />
                <label className="form-label">Title*</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setpostTitle(event.target.value);
                  }}
                />
                <label htmlFor="exampleInputBirthDate" className="form-label">
                  Message*
                </label>
                <textarea
                  className="form-control"
                  value={textPost}
                  onChange={(event) => {
                    settextPost(event.target.value);
                  }}
                />

                <label className="form-label">
                  Choose the corresponding sport* &nbsp; &nbsp;
                </label>
                <select
                  value={groupId}
                  onChange={(event) => {
                    setgroupId(event.target.value);
                  }}
                >
                  <option value="0">Football</option>
                  <option value="1">Basketball</option>
                  <option value="2">Ping-pong</option>
                  <option value="3">Tennis</option>
                  <option value="4">Rugby</option>
                  <option value="5">Swimming</option>
                  <option value="6">Volley-ball</option>
                  <option value="7">Badminton</option>
                  <option value="8">Baseball</option>
                </select>
                <br />
                <br />
                <div className="text-center">
                <button
                type="submit"
                className="Boutton btn bouton-create-post"
                onClick={() => createPost()}
              >
                Create post
              </button>
              <br />
              <br />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};
export default Inscription;

//////////////////////////
//// serverSideProps ////
/////////////////////////
export const getServerSideProps: GetServerSideProps = async (context) => {
  let currentUsersEmailFromDB = "";
  let currentUsersName = "";
  let currentUsersCover = "";
  let currentUsersBirthdate = "";
  let currentUsersCategories = [];
  let currentUserId = "";

  const c = context.req.cookies.fewlines;
  if (c) {
    const currentUser = await getUserByCookie(c);
    currentUsersEmailFromDB = currentUser.email;
    currentUsersName = currentUser.userName;
    currentUsersCover = currentUser.Cover ? currentUser.Cover : "";
    currentUsersBirthdate = currentUser.Birthdate;
    currentUsersCategories = currentUser.Groups;
    currentUserId = currentUser._id;
  }

  const sportCategories = await getSportCategories();
  const categoriesImgDescription = await sportCategories.map((category) => {
    return category.UserName;
  });

  const categoriesImgArrayFromDB = await sportCategories.map((category) => {
    return category.Cover;
  });

  return {
    props: {
      categoriesImgArray: categoriesImgArrayFromDB,
      categoriesImgDescription: categoriesImgDescription,
      currentUsersEmail: currentUsersEmailFromDB
        ? JSON.parse(JSON.stringify(currentUsersEmailFromDB))
        : "",
      currentUsersName: currentUsersName
        ? JSON.parse(JSON.stringify(currentUsersName))
        : "",
      currentUserCover: currentUsersCover,
      currentUsersBirthdate: currentUsersBirthdate,
      currentUsersCategories: currentUsersCategories
        ? currentUsersCategories
        : [],
      currentUserId: JSON.parse(JSON.stringify(currentUserId)),
    },
  };
};

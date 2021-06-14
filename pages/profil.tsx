import React, { useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getDatabase } from "../utils/mongodb";
import CommentPost from "../components/commentPost";
import Layout from "../components/Layout";

const Profil: NextPage<{ currentUsersEmail; data; user }> = ({
  currentUsersEmail,
  data,
  user,
}) => {

  /////////////////////
  ///// useState /////
  ////////////////////
  const [usersEmail, setUsersEmail] = useState(currentUsersEmail);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [like, setLike] = useState(0);
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const router = useRouter();

  /////////////////////
  ///// function /////
  ////////////////////
  function handleChange(event) {
    setInput(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  /////////////////////
  ///// fetchApi /////
  ////////////////////
  const postComment = async () => {
    const data = {
      commentsPost: input,
    };
    await fetch("/api/postcomment", {
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
          setErrorMessage("please enter a message");
        } else {
          router.push("/profil");
        }
      });
  };

  ////////////////////
  //// postLike /////
  ///////////////////
  const postLike = async () => {
    const data = {
      likePost: like,
    };
    await fetch("/api/postlike", {
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
          setErrorMessage("please do it again");
        } else {
          router.push("/profil");
        }
      });
  };

  ////////////////////
  /// commentPost ///
  ///////////////////
  const commentPost = () => {
    return data.map((value, index) => {
      return (
        <div className="card-comment darker mt-4 text-justify" key={index}>
          <img
            src="https://i.imgur.com/CFpa3nK.jpg"
            alt=""
            className="rounded-circle"
            width={40}
            height={40}
          />
          <div>
            <h4>{value.userId}</h4>
            <br />
            <span>{value.datePost}</span>
            <br />
            <p>{value.textPost}</p>
          </div>
          <button
            className="btn btn-warning"
            onClick={() => {
              like ? setLike(like - 1) : setLike(like + 1);
            }}
          >
            {value.likePost ? value.likePost + like : value.likePost + like}
          </button>
        </div>
      );
    });
  };

  ////////////////////
  //// useEffect ////
  ///////////////////
  useEffect(() => {}, [usersEmail, input]);

  ////////////////////
  //// Affichage ////
  ///////////////////
  return (
    <Layout>
    <div className="bodyPost">
      <div className="BodyNews">
        <div className="row">
          <div className="BodyNews col-3">
            <div className="container">
              {errorMessage ? <p>{errorMessage}</p> : <></>}
              {user.map((value, index) => {
                return (
                  <div className="DivSugg" key={index}>
                    <div>
                      <img
                        key={value.id}
                        className="SuggestionProfil"
                        src={value.photo}
                        alt=""
                      />
                    </div>
                    <button className="btn btn-secondary">
                      Add {value.UserName}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="BodyNews col-5">
            {data.map((value, index) => {
              return (
                <div className="carte-post">
                <div className="carte card">
                  <img src={value.photosPost} />
                  <br />
                  <button
                    className="bouton-comment"
                    onClick={() => setIsCommentVisible(!isCommentVisible)}
                  >
                    comment
                  </button>
                </div>
                <br />
                </div>
              );
            })}
          </div>
          <div className="BodyNews col-4">
            <div className="container">
              <div>
                <div className="container">
                  <div className="row">
                    <div className="comment-card">
                      {isCommentVisible ? <CommentPost data={data} /> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div onSubmit={(e) => handleSubmit(e)} id="algin-form">
                <div className="form-group">
                  <h4>Leave a comment</h4>
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="msg"
                    cols={30}
                    rows={5}
                    onChange={handleChange}
                    className="form-control"
                    style={{ backgroundColor: "white" }}
                    defaultValue={""}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    id="post"
                    onClick={() => postComment()}
                    className="btn"
                  >
                    Post Comment
                  </button>
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

export default Profil;

/////////////////////
//// serverSide ////
////////////////////
export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const categoSport = await mongodb.db().collection("posts").find().toArray();
  const UserData = await mongodb.db().collection("user").find().toArray();
  const result = await categoSport.map((value) => {
    return {
      id: value.id,
      userId: value.userId,
      datePost: value.datePost,
      photosPost: value.photosPost,
      textPost: value.textPost,
      likePost: value.likePost,
      commentsPost: value.commentsPost,
    };
  });
  const result2 = await UserData.map((value) => {
    return {
      id: value.Id,
      UserName: value.UserName,
      photo: value.Cover,
    };
  });
  const fin = await JSON.parse(JSON.stringify(result));
  const fin2 = await JSON.parse(JSON.stringify(result2));
  return {
    props: {
      data: fin,
      user: fin2,
    },
  };
};

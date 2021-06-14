import { NextPage, GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getUserByCookie,
  getAllGroups,
} from "../utils/initDatabase";
import { useRouter } from "next/router";

const Home: NextPage = (props: any) => {
  type Post = {
    id: number;
    userId: number;
    datePost: string;
    photosPost: string;
    textPost: string;
    likePost: number[];
    commentsPost: string[];
    groupId: number;
    postTitle: string;
  };
  const router = useRouter();
  ////////////////////////////////////
  ////// useState, useEffect /////////
  ///////////////////////////////////

  const [listUsers, setListUsers] = useState([]);
  const [listMyGroups, setListMyGroups] = useState([]);
  const [listOtherGroups, setListOtherGroups] = useState([]);
  const [selectSport, setSelectSport] = useState("");
  const [comments, setComments] = useState([]);
  const [textComment, setTextComment] = useState(null);
  const [postId, setPostId] = useState(null);

  //const [resultGlobal, setResultGlobal] = useState([]);

  const tempPost: Post[] = [
    {
      id: 1,
      userId: 2,
      datePost: "1 / 1 / 2001",
      photosPost:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixid=MnwxMjA3fDB8MHxwaG90by1[…]fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
      textPost:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      likePost: [1],
      commentsPost: ["1"],
      groupId: 0,
      postTitle: "postTitle",
    },
  ];

  const [postFind, setPostFind] = useState<any>();
  const arrayOfGroupIds = listMyGroups.map((group) => group.id);
  const [sportsArray, setSportsArray] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [UserNameForComment, setUserNameForComment] = useState("");

  const OnClickSport = (idOfSport: number) => {
    const oneElemeArray = [idOfSport];
    setSportsArray(oneElemeArray);
  };

  const OnClickMySports = () => {
    setSportsArray(arrayOfGroupIds);
  };
  const getUserNameOnComment: any = async (idUser: any) => {
    fetch("/api/getusernameoncomment?idUser=" + idUser)
      .then((result) => result.json())
      .then((res) => {
        setUserNameForComment(res);

      });
  };
  
  const displayComments: any = async (postId: number) => {
    fetch("/api/displaycomments?postId=" + postId)
      .then((result) => result.json())
      .then((res) => {
        setComments(res);
      });
  };
  const comment = async (postId) => {
    const d = new Date();
    const date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()+" " + d.getHours()+":" + d.getMinutes();
    const data = {
      postId: postId,
      userId: props.currentUserId,
      DateComment: date,
      text: textComment,
    };
    setTextComment("");
    await fetch("/api/createcomment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    //router.push("/home");
    
  };
  useEffect(() => {
    setListOtherGroups(props.currentUserOtherGroupsArray);
    setListMyGroups(props.currentUserGroupsArray);

    const defaultUsers: any = async () => {
      await fetch("/api/defaultUsers").then((res) =>
        res.json().then((result) => setListUsers(result))
      );
    };

    const searchPosts: any = async (groupIds: number[]) => {
      let resultGlobal = [];
      groupIds.forEach((groupId) => {
        fetch("/api/findpostsbygroup?groupId=" + groupId).then((res) => {
          res.json().then((result) => {

            for (let i = 0; i < result.length; i++) {
              resultGlobal.push(result[i]);
            }
            setPostFind(resultGlobal);

            const resultFinal = result.map((post) => {
              const postLighten = {
                id: post.id,
                userId: post.userId,
                datePost: post.datePost,
                photosPost: post.photosPost,
                textPost: post.textPost,
                likePost: post.likePost,
                commentsPost: post.commentsPost,
                groupId: post.groupId,
                postTitle: post.postTitle,
              };
              return postLighten;
            });
            return resultFinal;
          });
        });
      });
    };
    defaultUsers();
    searchPosts(sportsArray);
  }, [sportsArray,comments,UserNameForComment]);

  ///////////////////////////
  ////// Affichage /////////
  //////////////////////////
  return (
    <Layout>
      <div>
        <div className="BodyNews">
          <div className="container">
            <div className="row"></div>
          </div>
          <div className="row">
            <div className="BodyNews col-3">
              <div className="container">
                <h3 onClick={() => OnClickMySports()}>My sports</h3>
                {listMyGroups.map((group, index) => {
                  return (
                    <div style={{ textAlign: "center" }}>
                      <div className="card bg-dark" style={{ width: 280, height: 280}}>
                        <img
                          key={"image" + index}
                          src={group.CoverSidebar}
                          className="ImageGroupSidebar"
                          alt=""
                          onClick={() => OnClickSport(group.id)}
                        />

                        <div className="card-body">
                          <div className="card-title" key={"title" + index}>
                            {group.UserName}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <br></br>
                <h3>Other sports</h3>
                <br></br>
                {listOtherGroups.map((group, index) => {
                  return (
                    <div>
                      <div className="card bg-dark" style={{ width: 280, height: 280 }}>
                        <img
                          key={"image2" + index}
                          src={group.CoverSidebar}
                          className="ImageGroupSidebar"
                          alt=""
                          onClick={() => OnClickSport(group.id)}
                        />
                        <div className="card-body">
                          <div className="card-title" key={"title2" + index}>
                            {group.UserName}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="BodyNews col-5">
            <div><h3>Posts</h3></div>
              {postFind
                ? postFind.map((post, index) => {
                    return (
                      <div
                        className="card bg-dark mb-3"
                        style={{ width: 600 }}
                        onClick={() => setPostId(post._id)}
                      >
                        <div className="row g-0">
                          <div className="col-md-6">
                            <img
                              src={post.photosPost}
                              key={"postImage" + index}
                              alt="..."
                              style={{ width: 260, height: 360 }}
                            />
                          </div>
                          <div className="col-md-6">
                            <div
                              className="card-body"
                              style={{ textAlign: "left" }}
                            >
                              <h5 className="card-title">{post.postTitle}</h5>
                              <p className="card-text ">
                                {post.textPost}
                              </p>
                              <div
                                className="ImageGroupSidebar"
                                onClick={() => displayComments(post._id)}
                              >
                                <p className="card-text">
                                  <i className="far fa-comments">
                                    &nbsp;{post.commentsPost.length}
                                  </i>
                                  &nbsp;&nbsp;
                                  <small className="text-muted">comments</small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="BodyNews col-4">
              <div className="container">
                <h3>Comments</h3>
                <div>
                  <div className="container">
                    <div className="row">
                        {comments ? comments.map((comment, index) => {
                          return (
                            <div className="card bg-dark classComment" style={{ width: 390, height: 170 }}>
                              <img
                                src="https://images.vexels.com/media/users/3/136558/isolated/lists/43cc80b4c098e43a988c535eaba42c53-person-user-icon.png"
                                alt=""
                                className="rounded-circle"
                                width={40}
                                height={40}
                                key="img1"
                              />
                              <h4>{UserNameForComment}</h4> <span>{comment.DateComment}</span>
                              <br />
                              <p>{comment.text}</p>
                            </div>
                          );
                        }):null}
                      </div>
                      {(postId != null) ? 
                      <div className="card bg-dark" style={{ width: 390, height: 250 }}>
                        <div className="card-body">
                          <label
                            htmlFor="exampleInputBirthDate"
                            className="form-label"
                          >
                            Message
                          </label>
                          <textarea
                            className="form-control"
                            value={textComment}
                            onChange={(event) => {
                              setTextComment(event.target.value);
                            }}
                          />

                          <button
                            type="submit"
                            className="Boutton btn"
                            onClick={() => comment(postId)}
                          >
                            Comment
                          </button>
                        </div>
                      </div> : null
}
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
export default Home;

/////////////////////////
/// serverSideProps ////
////////////////////////
export const getServerSideProps: GetServerSideProps = async (context) => {
  let currentUsersName = "";
  let currentUsersCover = "";
  let currentUserGroups = "";
  let currentUserGroupsArray = [];
  let currentUserOtherGroupsArray = [];
  let allGroups = [];
  let currentUserId = "";

  const c = context.req.cookies.fewlines;
  if (c) {
    const currentUser = await getUserByCookie(c);
    allGroups = await getAllGroups();
    currentUserGroups = currentUser.Groups;
    currentUsersName = currentUser.userName;
    currentUsersCover = currentUser.Cover ? currentUser.Cover : "";
    currentUserGroupsArray = allGroups.filter((group, index) => {
      
      if (currentUserGroups[index]) return group;
    });
    currentUserOtherGroupsArray = allGroups.filter((group, index) => {
      if (currentUserGroups && !currentUserGroups[index]) return group;
    });
    currentUserId = currentUser._id;
  }

  return {
    props: {
      currentUsersName: currentUsersName
        ? JSON.parse(JSON.stringify(currentUsersName))
        : "",
      currentUsersCover: currentUsersCover,
      //currentUserGroupsArray: allGroups,
      // currentUserGroupsArray: JSON.parse(JSON.stringify(allGroups)),
      // currentUserGroups: currentUserGroups,
      currentUserGroupsArray: JSON.parse(
        JSON.stringify(currentUserGroupsArray)
      ),

      currentUserOtherGroupsArray: JSON.parse(
        JSON.stringify(currentUserOtherGroupsArray)
      ),
      currentUserId: JSON.parse(JSON.stringify(currentUserId)),
    },
  };
};

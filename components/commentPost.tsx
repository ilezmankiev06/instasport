import React, { useState } from "react";
import { NextPage } from "next";

const CommentPost: NextPage<{ data }> = ({ data }) => {
    const [like, setLike] = useState(0);
    return (
        data.map((value, index) => {
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
                <p>{value.commentsPost}</p>
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
        })
    );
};

export default CommentPost;


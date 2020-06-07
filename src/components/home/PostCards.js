import React from "react";

const PostCards = (props) => {
    console.log(props);
    return (
        <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{props.postHeader}</h5>
                <p className="card-text">{props.postContent}</p>
                {props.tags.map((elem) => {
                    return (
                        <span
                            style={{
                                color: "#fff",
                                backgroundColor: "grey",
                                padding: "5px",
                                marginRight: "5px",
                                borderRadius: "5px",
                            }}
                        >
                            #{elem}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default PostCards;

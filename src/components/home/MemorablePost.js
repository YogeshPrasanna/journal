import React from "react";

const MemorablePost = (props) => {
    if (props.memorablePost) {
        return (
            <span className="badge badge-pill badge-success" style={{ margin: "7px" }}>
                Memorable Day
            </span>
        );
    } else {
        return null;
    }
};

export default MemorablePost;

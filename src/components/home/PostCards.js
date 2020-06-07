import React from "react";

const PostCards = (props) => {
    console.log(props);

    const date = new Date("2020-06-07T14:57:06.471Z");
    const dateTimeFormat = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" });
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);

    return (
        <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-body custom-card">
                <h4 className="custom-card-date">{`${day} ${month} ${year}`}</h4>
                <h5 className="card-title custom-card-header">{props.postHeader}</h5>
                <p className="card-text custom-card-content">{props.postContent}</p>
                <div className="custom-card-tags">
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
        </div>
    );
};

export default PostCards;

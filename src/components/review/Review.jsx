import React from "react";
import "./Review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Review = ({review}) => {
  
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () => {
      return newRequest.get(`/users/${review.userId}`);
    },
  });

  return (
    <div className="review">
      <div className="item">
        <div className="user">
          <img
            className="pp"
            src={data?.data.data.img}
            alt=""
          />
          <div className="info">
            <span>{data?.data.data.username}</span>
            <div className="country">
              <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              />
              <span>{data?.data.data.country}</span>
            </div>
          </div>
        </div>
        <div className="stars">
          {Array(review.star).fill().map((item, i) => (
            <img src="/img/star.png" alt="" key={i}/>
          ))}
          <span>{review.star}</span>
        </div>
        <p>
          {review.desc}
        </p>
        <div className="helpful">
          <span>Helpful?</span>
          <img src="/img/like.png" alt="" />
          <span>Yes</span>
          <img src="/img/dislike.png" alt="" />
          <span>No</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
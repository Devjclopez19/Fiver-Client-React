import React, { useState } from "react";
import "./Gig.scss";
import Layout from "../../components/Layout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Link, useLocation, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => {
      return newRequest(`/gigs/single/${id}`);
    },
  });

  const userId = data?.data.data.userId

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return newRequest(`/users/${userId}`);
    },
    enabled: !!userId,
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  };

  return (
    <Layout>
      <div className="gig">
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="container">
            <div className="left">
              <span className="breadcrumbs">
                Fiverr {">"} Graphics & Design
              </span>
              <h1>{data?.data.data.title}</h1>
              <div className="user">
                {isLoadingUser ? (
                  "Loading"
                ) : errorUser ? (
                  "Something went wrong"
                ) : (
                  <>
                    <img
                      className="pp"
                      src={dataUser?.data.data.img || "./img/noavatar.png"}
                      alt=""
                    />
                    <span>{dataUser?.data.data.username}</span>
                  </>
                )}
                {!isNaN(
                  data?.data.data.totalStars / data?.data.data.starNumber
                ) && (
                  <div className="stars">
                    {Array(
                      Math.round(
                        data?.data.data.totalStars / data?.data.data.starNumber
                      )
                    )
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>
                      {Math.round(
                        data?.data.data.totalStars / data?.data.data.starNumber
                      )}
                    </span>
                  </div>
                )}
              </div>
              <div className="slider">
                <div className="container-s">
                  <Slider {...settings}>
                    {data?.data.data.images.map((img) => (
                      <div key={img}>
                        <img src={img} alt="" />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <h2>About This Gig</h2>
              <p>{data?.data.data.desc}</p>
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  {isLoadingUser ? (
                    "Loading"
                  ) : errorUser ? (
                    "Something went wrong"
                  ) : (
                    <>
                      <img
                        src={dataUser?.data.data.img || "/img/noavatar.png"}
                        alt=""
                      />
                    </>
                  )}
                  <div className="info">
                    {isLoadingUser ? (
                      "Loading"
                    ) : errorUser ? (
                      "Something went wrong"
                    ) : (
                      <>
                        <span>{dataUser?.data.data.username}</span>
                      </>
                    )}
                    {!isNaN(
                      data?.data.data.totalStars / data?.data.data.starNumber
                    ) && (
                      <div className="stars">
                        {Array(
                          Math.round(
                            data?.data.data.totalStars /
                              data?.data.data.starNumber
                          )
                        )
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(
                            data?.data.data.totalStars /
                              data?.data.data.starNumber
                          )}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser?.data.data.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>
                  {dataUser?.data.data.desc}
                  </p>
                </div>
              </div>
             <Reviews gigId={id} />
            </div>
            <div className="right">
              <div className="price">
                <h3>{data?.data.data.title} dd</h3>
                <h2>$ {data?.data.data.price}</h2>
              </div>
              <p>{data?.data.data.shortDesc}</p>
              <div className="details">
                <div className="item">
                  <img src="/img/clock.png" alt="" />
                  <span>{data?.data.data.deliveryTime} Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/img/recycle.png" alt="" />
                  <span>{data?.data.data.revisionNumber} Revisions</span>
                </div>
              </div>
              <div className="features">
                {data?.data.data.features.map((feature) => (
                  <div className="item" key={feature}>
                    <img src="/img/greencheck.png" alt="" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link to={`/pay/${id}`} className="link">
                <button>Continue</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gig;

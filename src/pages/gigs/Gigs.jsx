import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import Layout from "../../components/Layout";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation()
  
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => {
      return newRequest(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`);
    },
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
    console.log(sort);
  };

  useEffect(()=> {
    refetch()
  }, [sort])

  const apply = () => {
    refetch()
  };

  return (
    <Layout>
      <div className="gigs">
        <div className="container">
          <span className="breadcrumbs">Liverr - Graphics & Design - </span>
          <h1>AI Artists</h1>
          <p>
            Explore the boundaries of art and technology with Liverr's AI
            artists
          </p>
          <div className="menu">
            <div className="left">
              <span>Budget</span>
              <input ref={minRef} type="number" placeholder="min" />
              <input ref={maxRef} type="number" placeholder="max" />
              <button onClick={apply}>Apply</button>
            </div>
            <div className="right">
              <span className="sortBy">Sort by</span>
              <span className="sortType">
                {sort === "sales" ? "Best Selling" : "Newest"}
              </span>
              <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
              {open && (
                <div className="rightMenu">
                  {sort === "sales" ? (
                    <span onClick={() => reSort("createdAt")}>Newest</span>
                  ) : (
                    <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
                </div>
              )}
            </div>
          </div>
          <div className="cards">
            {isLoading
              ? "loading..."
              : error
              ? "What you were looking for was not found, please try other keywords"
              : data?.data.data.map((gig) => <GigCard key={gig._id} item={gig} />)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gigs;

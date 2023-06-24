import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const {pathname} = useLocation()

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const handleLogout = async () => {
    const res = await newRequest.post("/auth/logout");
      if(res.data.success) {
        localStorage.setItem("currentUser", null)
        navigate('/')
      }
  }
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to='/' className="link">
          <span className="text">fiverr</span>
          <span className="dot">.</span>
          </Link>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          <Link to="/login" className="link"><span>Sign in</span></Link>
          {!currentUser && <Link to='/register'><button>Join</button></Link>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.png"} alt="perfil" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  { currentUser?.isSeller && (
                    <>
                      <Link to="/mygigs" className="link">Gigs</Link>
                      <Link to="/add" className="link">Add New Gig</Link>
                    </>
                  )}
                  <Link to="/orders" className="link">Orders</Link>
                  <Link to="/messages" className="link">Messages</Link>
                  <Link to="/" className="link" onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/" ) && (
        <>
          <div className="hr"></div>
          <div className="menu">
            <Link className="link menuLink" to="/">Graphics & Desing</Link>
            <Link className="link" to="/">Video & Animation</Link>
            <Link className="link" to="/">Writing & Translation</Link>
            <Link className="link" to="/">AI Services</Link>
            <Link className="link" to="/">Digital Marketing</Link>
            <Link className="link" to="/">Music & Audio</Link>
            <Link className="link" to="/">Programming & Tech</Link>
            <Link className="link" to="/">Business</Link>
            <Link className="link" to="/">Lifestyle</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

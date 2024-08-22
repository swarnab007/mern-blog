import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { SERVER_URL } from "../../const";
import axios from "axios";

const Header: React.FC = () => {
  const { userInfo, setUserInfo } = useContext<any>(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/auth/profile`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setUserInfo(data?.info);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Logout handler
  const logoutHandler = async () => {
    try {
      await axios.post(
        `${SERVER_URL}/api/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUserInfo(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const username = userInfo?.name;

  return (
    <div>
      <header>
        <Link to="/" className="logo">
          MyBlog
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logoutHandler}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;

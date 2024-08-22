import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../const";
import axios from "axios";
import { UserContext } from "../../context/userContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUserInfo } = useContext<any>(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(username, password);
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      setUserInfo(data?.user);
      alert("Welcome");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2 className="text-center">Welcome </h2>
      <h5 className="text-center">
        New User ? <Link to="/register">Create Account</Link> here
      </h5>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

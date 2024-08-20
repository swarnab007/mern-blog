import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div>
      <h2 className="text-center">Welcome </h2>
      <h5 className="text-center">
        New User ? <Link to="/register">Create Account</Link> here
      </h5>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input
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
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <h6 className="mt-4 text-center"><Link to='/'>Forgot Password</Link></h6>
        <p className="text-center">or</p>
        <button type="submit" className="btn btn-primary">
          Sign up with Google
        </button>
      </form>
    </div>
  );
};

export default Login;

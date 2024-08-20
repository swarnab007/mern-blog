import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
// import IndexPage from "./pages/IndexPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import {UserContextProvider} from "./UserContext";
// import CreatePost from "./pages/CreatePost";
// import PostPage from "./pages/PostPage";
// import EditPost from "./pages/EditPost";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<IndexPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/create" element={<CreatePost />} /> */}
        {/* <Route path="/post/:id" element={<PostPage />} /> */}
        {/* <Route path="/edit/:id" element={<EditPost />} />  */}
      </Route>
    </Routes>
  );
};

export default App;

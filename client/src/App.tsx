import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import GetPosts from "./components/GetPosts";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreatePost from "./pages/blog/createPost";
import { UserContextProvider } from "./context/userContext";
import PostPage from "./pages/blog/PostPage";
// import EditPost from "./pages/EditPost";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GetPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          {/* <Route path="/edit/:id" element={<EditPost />} />  */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;

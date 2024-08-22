import axios from "axios";
import Post from "../pages/blog/post";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../const";

interface PostData {
  _id: string;
  title: string;
  summary: string;
  cover: string;
  content: string;
  createdAt: string;
  author: {
    username: string;
  };
}

export default function GetPosts() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/blog/get-blogs`);
        const fetchedPosts = response.data.data; // Accessing data from the response
        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getAllBlogs();
  }, []);

  useEffect(() => {
    console.log("Posts: ", posts); // Logging posts after state update
  }, [posts]);

  return (
    <>
      {posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}

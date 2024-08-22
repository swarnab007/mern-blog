import React, { useState, ChangeEvent, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../../Editor";
import axios from "axios";
import { SERVER_URL } from "../../../const";

const EditPost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const createNewPost = async (e: FormEvent) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      console.error("No file selected");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("file", files[0]);

    try {
      const response = await axios.put(
        `${SERVER_URL}/api/blog/update-blog`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `${SERVER_URL}/api/blog/delete-blog`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSummary(e.target.value)
        }
      />
      <input
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFiles(e.target.files)
        }
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Update post</button>
      <button
        onClick={deleteHandler}
        type="submit"
        style={{ marginTop: "5px" }}
      >
        Delete post
      </button>
    </form>
  );
};

export default EditPost;

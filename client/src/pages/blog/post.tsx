import { Link } from "react-router-dom";
import { SERVER_URL } from "../../../const";

interface PostProps {
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

export default function Post({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
}: PostProps) {

  console.log("PostProps: ", _id, title, summary, cover, createdAt, author);
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`${SERVER_URL}/` + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <span className="author">{author.username}</span>
          {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

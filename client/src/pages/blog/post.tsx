// import {formatISO9075} from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

export const Post: React.FC = () => {
  return (
    <div className="post">
      <div className="image">
        <Link to="/">
          <img
            src="https://www.startupindia.gov.in/content/sih/en/bloglist/blogs/how-are-agritech-startups-revolutionising-farming-practices-in-india/_jcr_content/image/file/_jcr_content"
            alt=""
          />
        </Link>
      </div>
      <div className="texts">
        <Link to="/">
          <h2>
            How are AgriTech Startups Revolutionising Farming Practices in India
          </h2>
        </Link>
        <p className="info">
          <a className="author">
            Dr Anu Kadyan, Ananya Kumar and Radhika Kohli
          </a>
        </p>
        <p className="summary">
          With over 70% of India’s rural population still being dependent on
          agriculture for their livelihood, the need for innovation in the
          sector has always remained high. In this scenario, efforts have been
          made by Government-led initiatives like Startup India to foster the
          growth of an ecosystem with Agritech sector being one of the key
          areas. AgriTech is a term used for agricultural technology, which
          involves the use of technology to improve farming and agriculture
          across different value chains. It includes sophisticated technologies
          that drive the so-called 'fourth agricultural revolution,' akin to the
          industry 4.0 revolution, shaping the future of the sector. In India,
          AgriTech has continued to grow with startups using innovation and
          digital technologies like precision farming, quality management,
          production, supply- chain/market linkage, and digital traceability to
          name a few.{" "}
        </p>
      </div>
    </div>
  );
};

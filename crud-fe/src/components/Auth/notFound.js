import React, { useEffect } from "react";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import notFound from "../../../src/assets/images/notFound.png";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);
  return (
    <div>
      <img className="notFound" src={notFound} alt="404NotFound"></img>
      <Link to="/login">
        <Button className="back" type="primary" icon={<HomeOutlined />}>
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}

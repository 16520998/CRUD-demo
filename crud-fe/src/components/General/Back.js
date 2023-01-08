import "./BackStyle.css";

import React from "react";
import { LeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Back = ({ title = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    return navigate(-1);
  };
  return (
    <header className="header-back-container">
      <div className="container-back">
        <Button
          className="back-button-style"
          type="link"
          onClick={handleBack}
          icon={<LeftOutlined />}
        />
        <div className="page-title">{title}</div>
        <div className="support-back">
          <QuestionCircleOutlined />
          <Link to="/aboutUs" style={{ padding: "10px", color: "white" }}>
            About Us
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Back;

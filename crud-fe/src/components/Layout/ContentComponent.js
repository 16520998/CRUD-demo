import RouteComponent from "../../routes";
import { Layout } from "antd";
import "./layout.css";
import React from "react";

const { Content } = Layout;

function ContentComponent() {
  return (
    <Content className="content-layout">
      <RouteComponent />
    </Content>
  );
}

export default ContentComponent;

import React from "react";
import { ExportOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "../../components/Layout/layout.css";

const { confirm } = Modal;

export default function Logout() {
  // { setAccessToken, setRefreshToken }
  let navigate = useNavigate();
  let path = `/login`;

  function showConfirm() {
    confirm({
      title: "Do you want to logout?",
      icon: <ExclamationCircleOutlined />,
      okText: "Logout",
      okType: "danger",
      async onOk() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              localStorage.clear(),
              navigate(path),
              notification["success"]({
                message: "Logout successful",
              })
            );
          }, 1000);
        });
      },
    });
  }

  return (
    <Button
      className="button-log-out"
      size="large"
      type="text"
      shape="circle"
      onClick={showConfirm}
    >
      <ExportOutlined style={{ fontSize: "25px", color: "white" }} />
    </Button>
  );
}

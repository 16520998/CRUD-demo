import { Layout } from "antd";
import "./layout.css";
import { Row } from "antd";

const { Footer } = Layout;

function FooterManage() {
  return (
    <>
      <Footer className="footer-layout">
        <div>
          <Row className="footer-content">ASAC ©2022 Created by SPTeam</Row>
        </div>
      </Footer>
    </>
  );
}
export default FooterManage;

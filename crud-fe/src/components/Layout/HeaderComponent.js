import {Layout, Row, Col, Avatar} from "antd";
import Logout from "../Auth/logout";
import "./layout.css";

const {Header} = Layout;

function HeaderComponent() {
    let user = JSON.parse(localStorage.getItem("userDetails"));

    return (
        <>
            <Header
                className="header-layout"
                style={{position: "sticky", top: 0, zIndex: 1, width: "100%"}}
            >
                <Row className="row-header">
                    <Col xs={6} sm={4} md={3} lg={3} xl={3}>
                        {/*<Row className="row-text-container">*/}
                        {/*  <Avatar src={user?.avatar} size="large" />*/}
                        {/*  <p className="header-text">{user?.name}</p>*/}
                        {/*</Row>*/}
                    </Col>
                    <Col xs={14} sm={16} md={19} lg={20} xl={20}></Col>
                    <Col xs={4} sm={4} md={2} lg={1} xl={1}>
                    <p className="header-text">{user?.name}</p>
                        <Logout/>
                    </Col>
                </Row>
            </Header>
        </>
    );
}

export default HeaderComponent;

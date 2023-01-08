import React from "react";
import "./login.css";
import ParticleBackground from "../../components/particles";
import {Button, Form, Input, notification} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import {useMutation} from "@tanstack/react-query";
import {login} from "../../Services/userService/userService";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const mutation = useMutation(login);

    const onCreate = (values) => {
        mutation.mutate(values, {
            onSuccess: (res) => {
                localStorage.setItem("userDetails", JSON.stringify(res.data.data));
                navigate("/admin/products");
                notification["success"]({
                    message: `Success`,
                    description: `Login successfully!`,
                });
            },
            onError: (error) => {
                notification["error"]({
                    message: `Login failed!`,
                    description: "Invalid email or password",
                });
            },
        });
    };
    return (
        <>
            <ParticleBackground/>
            <div className="login-page">
                <div className="login-box">
                    <div className="illustration-wrapper">
                        <img
                            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000"
                            alt="Login"/>
                    </div>
                    <Form className="login-form" onFinish={onCreate}>
                        <p className="form-title">Sign In</p>

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Email"/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Login;

import { Button, Input, Form, notification } from "antd";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import { useMutation } from "@tanstack/react-query";
import TextArea from "antd/lib/input/TextArea";
import { createAProduct } from "../../../Services/Product/productService";

export function CreateProductInfo() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createAProduct
  });

  const onCreate = (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        notification["success"]({
          message: `Success`,
          description: `Create successfully!`,
        });
        navigate("/admin/products");
      },
      onError: (error) => {
        notification["error"]({
          message: `Create failed!`,
          description: error.message,
        });
      },
    });
  };
  return (
    <>
      <div className="info-container">
        <h1 className="specialization-info-heading">Create a product</h1>

        <div className="specialization-info-content">
          <Form
            labelCol={{ sm: 6, md: 4, lg: 4, xl: 3, xxl: 2 }}
            wrapperCol={{ sm: 18, md: 20, lg: 20, xl: 21, xxl: 22 }}
            className="info-content-form"
            onFinish={onCreate}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input product's name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Detail"
              name="detail"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input product's detail!",
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

function CreateAProduct() {
  return (
    <>
      <Link to={"create"}>
        <Button
          className="button-create"
          type="primary"
          icon={<PlusOutlined />}
          bordered
        >
          Create
        </Button>
      </Link>
    </>
  );
}

export default CreateAProduct;

import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import "../user.css";
import Loading from "../../General/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TextArea from "antd/lib/input/TextArea";
import {
  editAProduct,
  fetchProductById,
} from "../../../Services/Product/productService";

export function EditProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => editAProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const onEdit = (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        notification["success"]({
          message: `Success`,
          description: `Edit successfully!`,
        });
        navigate("/admin/products");
      },
      onError: (error) => {
        notification["error"]({
          message: `Edit failed!`,
          description: error.message,
        });
      },
    });
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <div className="info-container">
          <h1 className="specialization-info-heading">Edit a product</h1>

          <div className="specialization-info-content">
            <Form
              labelCol={{ sm: 6, md: 4, lg: 4, xl: 3, xxl: 2 }}
              wrapperCol={{ sm: 18, md: 20, lg: 20, xl: 21, xxl: 22 }}
              className="info-content-form"
              initialValues={data}
              onFinish={onEdit}
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
      )}
    </>
  );
}

function EditProduct({ productId }) {
  return (
    <>
      <Link to={`${productId}/edit`}>
        <Button className="button-edit" type="link" icon={<EditOutlined />}>
          Edit
        </Button>
      </Link>
    </>
  );
}

export default EditProduct;

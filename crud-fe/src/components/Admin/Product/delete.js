import React from "react";
import { Button, Modal, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteAProduct} from "../../../Services/Product/productService";

function DeleteAProduct({ productId }) {
  const { confirm } = Modal;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteAProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  function showConfirm() {
    confirm({
      title: "Do you want to delete this product?",
      async onOk() {
        mutation.mutate(productId, {
          onSuccess: () => {
            notification["success"]({
              message: `Success`,
              description: `Delete successfully!`,
            });
          },
          onError: (error) => {
            notification["error"]({
              message: `Delete failed!`,
              description: error.message,
            });
          },
        });
      },
    });
  }

  return (
    <>
      <Button
        className="button-delete"
        onClick={showConfirm}
        type="text"
        danger
        icon={<DeleteOutlined />}
      >
        Delete
      </Button>
    </>
  );
}

export default DeleteAProduct;

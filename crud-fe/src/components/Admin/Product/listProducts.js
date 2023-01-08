import React from "react";
import "../user.css";
import { Table, Space, Col, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../General/Loading";
import { fetchProducts } from "../../../Services/Product/productService";
import DeleteAProduct from "./delete";
import EditProduct from "./edit";
import CreateAProduct from "./create";
const { Column } = Table;

function NameOfTable() {
  return (
    <>
      <Row className="table-name-container" justify="space-between">
        <Col className="table-name-col" xs={21} sm={20}>
          <p className="table-name-text">PRODUCTS</p>
        </Col>
        <Col className="table-name-col">
          <Space>
            <CreateAProduct />
          </Space>
        </Col>
      </Row>
    </>
  );
}

function ListOfProducts() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  return (
    <>
      <NameOfTable />
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <Table
          dataSource={data}
          bordered="true"
          scroll={{ x: 300 }}
          rowKey="productId"
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Detail" dataIndex="detail" key="detail" />
          <Column
            title="Action"
            key="action"
            render={(record) => (
              <div className="button-group">
                <EditProduct productId={record.id} />
                <DeleteAProduct productId={record.id} />
              </div>
            )}
          />
        </Table>
      )}
    </>
  );
}

export default ListOfProducts;

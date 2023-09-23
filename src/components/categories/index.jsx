// import
import React, { memo, useEffect, useState, useCallback } from "react";
import {
  Space,
  Table,
  Form,
  Button,
  Popconfirm,
  Modal,
  message,
  Row,
  Col,
  Pagination,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { axiosClient } from "helper/axiosClient";
import CategoriesForm from "./categoriesForm";
const url = process.env.REACT_APP_BASE_USE_URL;
function Categories() {
  // variable
  const DEFAULT_LIMIT = 5;
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: DEFAULT_LIMIT,
  });
  const [search, setSearch] = useState({
    categoryId: undefined,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [categories, setCategories] = useState([]);
  const [updateForm] = Form.useForm();

  const onSelectProduct = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedProduct(data);

      updateForm.setFieldsValue(data);
    },
    [updateForm]
  );

  const onFinish = useCallback(
    async (values) => {
      try {
        await axiosClient.post("/category", values);
        setRefresh(refresh + 1);
        setIsHidden(true);
        alert("Thêm sản phẩm thành công");
      } catch (error) {
        return alert("Thêm sản phẩm thất bại");
      }
    },
    [refresh]
  );
  const onDeleteFinish = useCallback(
    (id) => async () => {
      try {
        await axiosClient.patch(`/category/delete/${id}`);

        setRefresh(refresh + 1);
        alert("Xóa thành công");
      } catch (error) {
        alert("Xóa thất bại");
      }
    },
    [refresh]
  );
  const onEditFinish = useCallback(
    async (data) => {
      try {
        await axiosClient.put(`/category/${selectedProduct._id}`, data);
        setRefresh(refresh + 1);
        updateForm.resetFields();
        setEditModalVisible(false);
        message.success("Cập nhật thành công");
      } catch (error) {
        message.error("Cập nhật thất bại");
      }
    },
    [selectedProduct, updateForm, refresh]
  );
  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get("/category");
      setCategories(res.data.payload);
    } catch (err) {
      console.log("◀◀◀ err ▶▶▶", err);
    }
  }, []);
  const onChangePage = useCallback((page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  }, []);


  useEffect(() => {
    getCategories();
  }, [getCategories, refresh]);
  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={onSelectProduct(record)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              okText="Đồng ý"
              cancelText="Đóng"
              onConfirm={onDeleteFinish(record._id)}
              //   onConfirm={console.log(record.id)}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const handleChange = (value) => {
    console.log("◀◀◀ choose ▶▶▶", value);
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
    setSearch((prev) => {
      if (value === "all") {
        return {
          ...prev,
          categoryId: null,
        };
      }
      return {
        ...prev,
        categoryId: value,
      };
    });
  };
  return (
    // main
    <>
      <Row>
        <Col span={20}>
          <h1>Categories</h1>
        </Col>
      </Row>

     
        <div className="container">
          <CategoriesForm
            formName="add-product-form"
            onFinish={onFinish}
          />
        </div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={categories}
        pagination={false}
      />
      <Pagination
        defaultCurrent={pagination.page}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onChange={onChangePage}
      />
      <Modal
        open={editModalVisible}
        centered
        title="Cập nhật thông tin"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Đóng"
        okText="Lưu"
        onOk={() => {
          updateForm.submit();
        }}
      >
        <CategoriesForm
          form={updateForm}
          onFinish={onEditFinish}
          formName="update-product"
          isHiddenSubmit
        />
      </Modal>
    </>
  );
}
export default memo(Categories);

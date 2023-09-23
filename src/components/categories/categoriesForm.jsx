import React, { memo } from "react";
import { Button, Form, Input, InputNumber, Select,Upload  } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
function CategoriesForm(props) {
  const {
    isHiddenSubmit,
    formName,
    form,
    optionStyle,
    suppliers,
    categories,
    onFinish,
    className
  } = props;
  return (
    <div className="w-75 mx-auto">
      <Form
        form={form}
        className={className}
        name={formName}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={optionStyle}
        onFinish={onFinish}
      >
        
        <Form.Item
          label="Tên loại sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên loại sản phẩm" },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input />
        </Form.Item>

        {!isHiddenSubmit && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  )
}

export default memo(CategoriesForm)

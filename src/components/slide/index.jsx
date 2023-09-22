import React,{useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import {
    UserOutlined,AppstoreOutlined,ShopOutlined,ShoppingFilled
  } from "@ant-design/icons";
  import { Layout, Menu, } from "antd";

import './slide.scss'
  const{Sider}=Layout
function Slide(props) {
    const navigate=useNavigate()
    const onClick = useCallback((e) => {
        navigate(e.key)
      }, [navigate]);
    
    return (
        <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo-header" ><h2>Add content</h2></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={onClick}
          items={[
            {
              key: "products",
              label: "Products",
            },
            {
                key: "categories",
                label: "Categories",
              },
              {
                key: "suppliers",
                label: "Suppliers",
              },
            // {
            //   key: "4",
            //   icon: <VideoCameraOutlined />,
            //   label: "Customers",
            //   children: [
            //     {
            //       key: "addcustomer",
            //       label: "Add Customer",
            //     },
            //     {
            //       key: "customers",
            //       label: "Customer List",
            //     },
            //   ],
            // },
            // {
            //   key: "5",
            //   icon: <UploadOutlined />,
            //   label: "Orders",
            //   children: [
            //     {
            //       key: "order_dashboard",
            //       label: "Dashboard",
            //     },
            //     {
            //       key: "orders",
            //       label: "Order List",
            //     },
            //     {
            //       key: "orderprocess",
            //       label: "Order in Process",
            //     },
            //   ],
            // },
          ]}
        />
      </Sider>
    );
}

export default Slide;
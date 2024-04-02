import React from "react";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import profileIconOrange from "../../assets/Profile_orange.svg";
import profileIcon from "../../assets/Profile_gray.svg";
import PasswordChange from "../PasswordChange/PasswordChange";
import passwordChangeIcon from "../../assets/Lock.svg";
import css from "./profile.module.css";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        icon: <SmileOutlined />,
        label: "Нямаа",
      },
      {
        key: "2",
        icon: <SmileOutlined />,
        label: "",
      },
      {
        key: "3",
        icon: <SmileOutlined />,
        danger: false,
        label: "Нууц үг солих",
      },
      {
        key: "4",
        icon: <SmileOutlined />,
        danger: false,
        label: "Гарах",
        color: "red",
      },
    ]}
  />
);
const ProfileNew = () => {
  return (
    <div className={css.containerNew}>
      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <img src={profileIconOrange} alt="profile icon" />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default ProfileNew;

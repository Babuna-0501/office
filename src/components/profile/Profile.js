import React, { useContext, useState, useEffect, useRef } from "react";
import css from "./profile.module.css";
import UserDataHook from "../../Hooks/userHook";
import profileIcon from "../../assets/Profile_gray.svg";
import PasswordChange from "../PasswordChange/PasswordChange";
import passwordChangeIcon from "../../assets/Lock.svg";

const Profile = (props) => {
  const [userInfoPro, setUserInfoPro] = useState([]);

  const userCtx = useContext(UserDataHook);
  // console.log("userCtx", userCtx?.userInfo?.data);

  const passwordChangeHandler = () => {
    userCtx.setPasswordChangeShow(true);
  };
  useEffect(() => {
    setUserInfoPro(userCtx?.userInfo?.data);
  }, [userCtx?.userInfo]);
  const logout = () => {
    window.localStorage.removeItem("ebazaar_admin_token");
    window.location.href = "/";
  };

  let domNode;
  let useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
      let maybeHandler = (event) => {
        if (!domNode.current.contains(event.target)) {
          handler();
        }
      };

      document.addEventListener("mousedown", maybeHandler);

      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    });

    return domNode;
  };
  domNode = useClickOutside(() => {
    props.setShowProfile(false);
  });
  return (
    <div className={css.container} ref={domNode}>
      <div className={css.userInfo}>
        <img src={profileIcon} alt="profile" />
        <h3>{userInfoPro?.email}</h3>
      </div>
      <div className={css.middle}></div>
      <div className={css.userInfo} onClick={passwordChangeHandler}>
        <img src={passwordChangeIcon} alt="profile" />
        <h3>Нууц үг солих</h3>
      </div>
      <div className={css.middle}></div>
      <div className={css.close} onClick={() => logout()}>
        <img src="https://ebazaar.mn/icon/logout.svg" alt="close button" />
        <span>Гарах</span>
      </div>
    </div>
  );
};

export default Profile;

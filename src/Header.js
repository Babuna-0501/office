// CSS
import css from "./header.module.css";

// Packages
import { useContext, useState, useRef, useEffect } from "react";

// Components
import ChatIndex from "./Chat/Index";
import PasswordChange from "./components/PasswordChange/PasswordChange";

// Hooks
import UserDataHook from "./Hooks/userHook";
import ChatHook from "./Hooks/ChatHook";
import AppHook from "./Hooks/AppHook";
import { HeaderContext } from "./Hooks/HeaderHook";

//Icons
import { RefreshDark, ChatWhite, ProfileDark, ProfileGray, LockGray, LogoutRed } from './assets/icons'

function Header(props) {
  const appctx = useContext(AppHook);
  const userCtx = useContext(UserDataHook);
  const chatctx = useContext(ChatHook);
  const { showRefreshBtn, headerContent } = useContext(HeaderContext);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

 

  const chatOpenHandler = () => {
    chatctx?.setChatopen(!chatctx.chatopen);
  };

  return (
    <div className={css.headerWrapper}>
      <div className={css.headerContainer}>
        <div className={css.mainContent}>{headerContent}</div>

        <div className={css.separator} />

        <div className={css.headerContent}>
          {showRefreshBtn && (
            <button
              onClick={() => {
                window.location.reload();
              }}
              type="button"
              className={css.refreshBtn}
            >
              <RefreshDark />
            </button>
          )}

          <button
            onClick={chatOpenHandler}
            type="button"
            className={css.chatBtn}
          >
            <ChatWhite />
          </button>

          <button
            onClick={() => setShowProfileDropdown((prev) => !prev)}
            type="button"
            className={css.profileBtn}
          >
            <ProfileDark />
          </button>
        </div>
      </div>

      {chatctx.chatopen && <ChatIndex />}

      <Profile show={showProfileDropdown} setShow={setShowProfileDropdown} />

      {userCtx.passwordChangeShow && (
        <div style={{ position: "relative" }}>
          <PasswordChange />
        </div>
      )}
    </div>
  );
}

export default Header;

const Profile = ({show, setShow}) => {
  const userCtx = useContext(UserDataHook);
  const [shouldRender, setRender] = useState(show);

   const profileRef = useRef(null);

   useEffect(() => {
     const closeDropdowns = (e) => {
       if (profileRef.current && show && !profileRef.current.contains(e.target)) {
         setShow(false);
       }
     };

     document.addEventListener("mousedown", closeDropdowns);

     return () => {
       document.removeEventListener("mousedown", closeDropdowns);
     };
   }, [show]);

  useEffect(() => {
    if(show) setRender(true);
  }, [show])

  const onAnimationEnd = () => {
    if(!show) setRender(false);
  }


  const passwordChangeHandler = () => {
    userCtx.setPasswordChangeShow(true);
  };

  const logout = () => {
    window.localStorage.removeItem("ebazaar_admin_token");
    window.location.replace("/");
  };

  return (
    <>
      {shouldRender && (
        <div ref={profileRef} className={`${css.profileDropDownWrapper} ${show ? css.show : css.hide}`} onAnimationEnd={onAnimationEnd}>
          <div className={css.triangle} />

          <div className={css.dropDown}>
            <div className={css.profile}>
              <button type="button">
                <span>{userCtx?.userInfo?.data?.email}</span>
                <ProfileGray />
              </button>

              <button onClick={passwordChangeHandler} type="button">
                <span>Нууц үг солих</span>
                <LockGray />
              </button>

              <button onClick={logout} type="button">
                <span>Гарах</span>
                <LogoutRed />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

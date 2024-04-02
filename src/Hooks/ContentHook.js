import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const ContentHook = (props) => {
  const [newContentModal, setNewContentModal] = useState(false);
  const [title, setTitle] = useState("");
  const [detailShow, setDetailShow] = useState(false);
  const [detailInfo, setDetailInfo] = useState([]);
  const [sidebarShow, setSidebarShow] = useState(true);
  const [channelShow, setChannelShow] = useState(false);
  const [newDesignShow, setNewDesignShow] = useState(false);
  const [contentActive, setContentActive] = useState(null);
  const [productSidebar, setProductSidebar] = useState(false);
  const [bannerShow, setBannerShow] = useState(false);
  const [component3, setComponent3] = useState(false);
  const [bigBannerShow, setBigBannerShow] = useState(false);
  const [erelttei, setErelttei] = useState(false);
  const [component5, setComponent5] = useState(false);
  const [channelSiebar, setChannelSidebar] = useState(false);
  const [locationSidebar, setLocationSidebar] = useState(false);
  /* Data state */
  const [channelState, setChannelState] = useState([]);
  const [channelStateItem, setChannelStateItem] = useState([]);
  const [locationState, setLocationState] = useState([]);
  const [locationStateItem, setLocationStateItem] = useState([]);

  return (
    <Ctx.Provider
      value={{
        newContentModal,
        setNewContentModal,
        title,
        setTitle,
        detailShow,
        setDetailShow,
        detailInfo,
        setDetailInfo,
        sidebarShow,
        setSidebarShow,
        channelShow,
        setChannelShow,
        newDesignShow,
        setNewDesignShow,
        contentActive,
        setContentActive,
        productSidebar,
        setProductSidebar,
        bannerShow,
        setBannerShow,
        component3,
        setComponent3,
        bigBannerShow,
        setBigBannerShow,
        erelttei,
        setErelttei,
        component5,
        setComponent5,
        channelSiebar,
        setChannelSidebar,
        channelState,
        setChannelState,
        channelStateItem,
        setChannelStateItem,
        locationSidebar,
        setLocationSidebar,
        locationState,
        setLocationState,
        locationStateItem,
        setLocationStateItem,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;

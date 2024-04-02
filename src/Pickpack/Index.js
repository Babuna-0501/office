import React, { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";
import Request from "./Request";
import css from "./index.module.css";
import { List } from "./List";

const PickPack = () => {
  const tabs = [
    { id: 1, header: "Захиалга жагсаалт", content: <List /> },
    { id: 2, header: "Захиалга үүсгэх", content: <Request /> },
  ];

  const { setHeaderContent } = useContext(HeaderContext);

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <div className={css.tabHeaders}>
            {tabs.map((tab, index) => {
              return (
                <button
                  key={`shipment-tab-button-${index}`}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`${css.singleTabHeader} ${
                    activeTab === tab.id && css.active
                  }`}
                >
                  {tab.header}
                </button>
              );
            })}
          </div>
        </div>

        <div className={css.contentWrapper}>
          {tabs.find((tab) => tab.id === activeTab).content}
        </div>
      </div>
    </div>
  );
};

export default PickPack;

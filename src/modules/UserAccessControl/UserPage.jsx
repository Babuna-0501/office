// CSS
import css from "./userPage.module.css";

// Contexts
import { HeaderContext } from "../../Hooks/HeaderHook";

// Components
import { UserPageHeader, PermissionInfo, UserInfo } from "./components";
import { Button } from "../../components/common";

// Core Packages
import { useContext, useEffect, useState } from "react";

// Services
import { getSuppliers } from "./services";

const UserPage = () => {
  const { setHeaderContent } = useContext(HeaderContext);
  const [createNew] = useState(window.location.pathname.includes("/add"));
  const [userId] = useState(window.location.pathname.split("/")[2]);

  useEffect(() => {
    setHeaderContent(<UserPageHeader createNew={createNew} />);

    return () => {
      setHeaderContent(<></>);
    };
  }, [setHeaderContent, createNew]);

  return (
    <div className={css.container}>
      <div className={css.content}>
        <UserInfo createNew={createNew} />
        <PermissionInfo />
      </div>

      <div className={css.footer}>
        <Button variant="secondary" size="large">
          Цуцлах
        </Button>

        <Button variant="primary" size="large" width={154}>
          Хадгалах
        </Button>
      </div>
    </div>
  );
};

export default UserPage;

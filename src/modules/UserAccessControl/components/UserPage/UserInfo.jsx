// CSS
import css from "./userInfo.module.css";

// Components
import { Dropdown, Input, Switch } from "../../../../components/common";

// Core Packages
import { useState } from "react";

export const UserInfo = ({ createNew }) => {
  const [isSfa, setIsSfa] = useState(false);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Хэрэглэгчийн мэдээлэл</h2>
        <div className={css.switch}>
          <span onClick={() => setIsSfa((prev) => !prev)}>SFA хэрэглэгч</span>
          <Switch checked={isSfa} checkHandler={() => setIsSfa((prev) => !prev)} />
        </div>
      </div>

      <div className={css.content}>
        {createNew ? (
          <div className={css.inputWrapper}>
            <label>Нийлүүлэгч</label>
            <Dropdown size="medium" />
          </div>
        ) : null}

        <div className={css.inputWrapper}>
          <label>Имэйл</label>
          <Input size="medium" placeholder="Имэйл" />
        </div>

        <div className={css.inputWrapper}>
          <label>Нууц үг</label>
          <Input size="medium" placeholder="Нууц үг" />
        </div>

        <div className={css.inputWrapper}>
          <label>Овог</label>
          <Input size="medium" placeholder="Овог" />
        </div>

        <div className={css.inputWrapper}>
          <label>Нэр</label>
          <Input size="medium" placeholder="Нэр" />
        </div>

        <div className={css.inputWrapper}>
          <label>Утас</label>
          <Input size="medium" placeholder="Утас" />
        </div>

        <div className={css.inputWrapper}>
          <label>Role</label>
          <Dropdown size="medium" />
        </div>
      </div>
    </div>
  );
};

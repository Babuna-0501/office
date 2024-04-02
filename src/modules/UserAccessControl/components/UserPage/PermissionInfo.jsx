// CSS
import { Checkbox } from "../../../../components/common";
import css from "./permissionInfo.module.css";

export const PermissionInfo = () => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Хэрэглэгчийн Эрхүүд</h2>

      <div className={css.content}>
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
        <SinglePermission />
      </div>
    </div>
  );
};

const SinglePermission = () => {
  return (
    <div className={css.permissionWrapper}>
      <span className={css.permissionTitle}>Product</span>
      <div className={css.permissions}>
        <div className={css.singlePermission}>
          <Checkbox variant="primary" />
          <label>Create</label>
        </div>

        <div className={css.singlePermission}>
          <Checkbox variant="primary" />
          <label>Read</label>
        </div>

        <div className={css.singlePermission}>
          <Checkbox variant="primary" />
          <label>Update</label>
        </div>

        <div className={css.singlePermission}>
          <Checkbox variant="primary" />
          <label>Delete</label>
        </div>

        <div className={css.singlePermission}>
          <Checkbox variant="primary" />
          <label>Admin</label>
        </div>
      </div>
    </div>
  );
};

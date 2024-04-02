// CSS
import css from "./userHeader.module.css";

// Icons
import { AddUserWhite } from "../../../../assets/icons";

// Components
import { Button } from "../../../../components/common";

// Utils
import { navigate } from "../../../../utils/navigate";

export const UserHeader = () => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Хэрэглэгчийн эрх тохируулах</h1>
      </div>

      <div className={css.rightSide}>
        <Button onClick={(e) => navigate({e, href: '/newUser/add'})} type="button" variant="primary" size="medium" icon={true}>
          <AddUserWhite />
          Шинэ хэрэглэгч нэмэх
        </Button>
      </div>
    </div>
  );
};

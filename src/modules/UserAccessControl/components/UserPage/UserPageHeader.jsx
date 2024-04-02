// CSS
import css from "./userPageHeader.module.css";

// Components
import Link from "../../../../components/Routing/Link";

// Icons
import { ArrowRightGray } from "../../../../assets/icons";

export const UserPageHeader = ({ createNew }) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <div className={css.breadCrumbs}>
          <Link href="/newUser" className={css.title}>
            Хэрэглэгчийн эрх тохируулах
          </Link>
          <ArrowRightGray width={18} height={18} />
          <span className={css.subTitle}>{createNew ? "Шинэ хэрэглэгч нэмэх" : "Хэрэглэгч"}</span>
        </div>
      </div>
    </div>
  );
};

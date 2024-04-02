// CSS
import css from "./singleTargetHeader.module.css";

// Images
import { ArrowRightGray, PlusGray } from "../../../../assets/icons";

// Components
import Link from "../../../../components/Routing/Link";
import { Button } from "../../../../components/common";

export const SingleTargetHeader = (props) => {
  const { setShowProductTargetAdd, setShowCategoryTargetAdd, setShowBrandTargetAdd, user, productTargetExist, brandTargetExist, categoryTargetExist, loading, totalProductTargetExist } = props;

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <div className={css.breadCrumbs}>
          <Link className={css.title} href={`/userTargets/${user?.user_id}`}>
            Төлөвлөгөө
          </Link>

          <div className={css.arrowWrapper}>
            <ArrowRightGray />
          </div>

          {user && (
            <span className={css.subTitle}>
              {user.first_name ?? user.email ?? "Нэргүй"}
            </span>
          )}
        </div>
      </div>

      {!loading && (
        <div className={css.rightSide}>
          {!productTargetExist && !totalProductTargetExist && (
            <Button
              onClick={() => setShowProductTargetAdd(true)}
              variant="secondary"
              size="medium"
              icon
            >
              Бүтээгдэхүүн төлөвлөгөө
              <PlusGray />
            </Button>
          )}

          {!categoryTargetExist && !totalProductTargetExist && (
            <Button
              onClick={() => setShowCategoryTargetAdd(true)}
              variant="secondary"
              size="medium"
              icon
            >
              Ангилал төлөвлөгөө
              <PlusGray />
            </Button>
          )}

          {!brandTargetExist && !totalProductTargetExist && (
            <Button
              onClick={() => setShowBrandTargetAdd(true)}
              variant="secondary"
              size="medium"
              icon
            >
              Брэнд төлөвлөгөө
              <PlusGray />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

import css from "./userCard.module.css";
import { useEffect, useState } from "react";
import { ProfileGray } from "../../../assets/icons";
import Link from "../../../components/Routing/Link";

export const UserCard = ({ target, user, userRoles, products, index }) => {
  const [totalTarget, setTotalTarget] = useState(0);
  const [totalCompletedPercentage, setTotalCompletedPercentage] = useState(0);
  const [totalPendingPercentage, setTotalPendingPercentage] = useState(0);
  const [hasTarget] = useState(target.startDate && target.endDate);

  useEffect(() => {
    if (hasTarget) {
      const type = Number(target.type);
      let totalTargetCopy = 0;
      let totalCompleted = 0;
      let totalPending = 0;

      try {
        if (type === 1) {
          // Target type 1 processing
          if (target.products && target.products.length > 0) {
            for (const targetProd of target.products) {
              if (targetProd.target.amount) {
                totalTargetCopy += targetProd.target.amount;
                totalCompleted += targetProd.succeeded.amount;
                totalPending += targetProd.waiting.amount;
              } else if (targetProd.target.quantity) {
                const currentProduct = products.find((product) => product._id === targetProd._id);
                const price = currentProduct?.singlePrice ?? 0;
                totalTargetCopy += price * targetProd.target.quantity;
                totalCompleted += price * targetProd.succeeded.quantity;
                totalPending += price * targetProd.waiting.quantity;
              }
            }
          }

          if (target.categories && target.categories.length > 0) {
            for (const targetCategory of target.categories) {
              if (targetCategory.target.amount) {
                totalTargetCopy += targetCategory.target.amount;
                totalCompleted += targetCategory.succeeded.amount;
                totalPending += targetCategory.waiting.amount;
              }
            }
          }

          if (target.brands && target.brands.length > 0) {
            for (const targetBrand of target.brands) {
              if (targetBrand.target.amount) {
                totalTargetCopy += targetBrand.target.amount;
                totalCompleted += targetBrand.succeeded.amount;
                totalPending += targetBrand.waiting.amount;
              }
            }
          }
        }

        if (type === 2) {
          totalTargetCopy += target.target.goal;
          totalCompleted += target.target.succeeded;
          totalPending += target.target.waiting;
        }

        setTotalTarget(totalTargetCopy);
        setTotalCompletedPercentage(totalTargetCopy === 0 ? 0 : Math.round((totalCompleted * 100) / totalTargetCopy));
        setTotalPendingPercentage(totalTargetCopy === 0 ? 0 : Math.round((totalPending * 100) / totalTargetCopy));
      } catch (error) {
        console.error('Error processing target data:', error);
      }
    }
  }, [target, hasTarget, products]);

  if (hasTarget) {
    return (
      <Link
        href={`/userTargets/${target?.user?.user_id}`}
        className={css.container}
        style={{ backgroundColor: "#F9FCF5" }}
      >
        <div className={css.userInfo}>
          <div className={css.userDetails}>
            <div className={css.profileImageWrapper}>
              {user.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user.first_name ?? user.email}
                />
              ) : (
                <ProfileGray width={22} height={22} />
              )}
            </div>

            <div>
              <span className={css.lastName}>{user.last_name}</span>
              <span className={css.firstName}>
                {user.first_name ?? user.email ?? "Нэргүй"}
              </span>
            </div>
          </div>

          <div>
            <span className={css.text}>
              {userRoles.find((role) => role.BackofficeRoleID === user.role)
                ?.Role ?? "Админ"}
            </span>
            <span className={css.userCode}>{user.user_id}</span>
          </div>
        </div>

        <div className={css.targetInfoWrapper}>
          <div className={css.targetDetails}>
            <div className={css.targetDetailTexts}>
              <span className={css.text}>Төлөвлөгөө</span>
              <span className={css.amount}>
                {totalTarget.toLocaleString()}₮
              </span>
            </div>

            <div className={css.dates}>
              <div className={css.singleDate}>
                <span className={css.dateTitle}>Эхлэх огноо</span>
                <span className={css.dateValue}>
                  {target.startDate?.split("T")[0]}
                </span>
              </div>

              <div className={css.singleDate}>
                <span className={css.dateTitle}>Дуусах огноо</span>
                <span className={css.dateValue}>
                  {target.endDate?.split("T")[0]}
                </span>
              </div>
            </div>
          </div>

          <div
            className={css.targetGraph}
            style={{
              background: `conic-gradient(#2ab674 ${
                3.6 * totalCompletedPercentage
              }deg, #d6df2a  0deg)`,
            }}
          >
            <div
              className={css.secondGraph}
              style={{
                background: `conic-gradient(transparent ${
                  totalPendingPercentage + totalCompletedPercentage * 3.6
                }deg, #F1F1F1 0deg)`,
              }}
            ></div>

            <div className={css.graphValues}>
              <span className={css.completed}>{totalCompletedPercentage}%</span>
              <span className={css.pending}>{totalPendingPercentage}%</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className={css.container} style={{ backgroundColor: "#fff" }}>
      <div className={css.userInfo}>
        <div className={css.userDetails}>
          <div className={css.profileImageWrapper}>{user.profile_picture ? <img src={user.profile_picture} alt={user.first_name ?? user.email} /> : <ProfileGray width={22} height={22} />}</div>

          <div>
            <span className={css.lastName}>{user.last_name}</span>
            <span className={css.firstName}>{user.first_name ?? user.email ?? "Нэргүй"}</span>
          </div>
        </div>

        <div>
          <span className={css.text}>{userRoles.find((role) => role.BackofficeRoleID === user.role)?.Role ?? "Админ"}</span>
          <span className={css.userCode}>{user.user_id}</span>
        </div>
      </div>

      <div className={css.targetInfoWrapper}>
        <Link href={`/target/${target._id}`} className={css.createBtn}>
          Төлөвлөгөө үүсгэх
        </Link>
      </div>
    </div>
  );
};

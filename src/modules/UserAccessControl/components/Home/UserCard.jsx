// CSS
import css from "./userCard.module.css";

// Icons
import { ProfileGray } from "../../../../assets/icons";

// Components
import Link from "../../../../components/Routing/Link";



export const UserCard = ({ user }) => {
  return (
    <div className={css.container}>
      <div className={css.top}>
        <div className={css.profile}>
          <div className={css.profilePicture}>
            <ProfileGray width={22} height={22} />
          </div>

          <div className={css.names}>
            <span className={css.lastName}>{user.last_name ?? ""}</span>
            <span className={css.firstName}>
              {user.last_name ? user.first_name : user.first_name ?? user.email}
            </span>
          </div>
        </div>

        <Link href={"/newUser/123"} className={css.settingsBtn}>
          Тохиргоо
        </Link>
      </div>

      <div className={css.bottom}>
        <div className={css.bottomCol}>
          <span className={css.bottomTitle}>Үүрэг</span>
          <span className={css.bottomText}>{user.role ? user.role.Role : "Үүрэг байхгүй"}</span>
        </div>
        <div className={css.bottomCol}>
          <span className={css.bottomTitle}>Мэйл</span>
          <span className={css.bottomText}>{user.email ? user.email : "Имэйл байхгүй"}</span>
        </div>
        <div className={css.bottomCol}>
          <span className={css.bottomTitle}>Утас</span>
          <span className={css.bottomText}>
            {user.phone_number ? user.phone_number : "Утас байхгүй"}
          </span>
        </div>
      </div>
    </div>
  );
};

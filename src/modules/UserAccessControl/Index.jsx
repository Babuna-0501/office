// CSS
import css from "./index.module.css";

// Icons
import { SearchGray, ProfileGray } from "../../assets/icons";

// Core Packages
import { useContext, useEffect, useState } from "react";

// Contexts
import { HeaderContext } from "../../Hooks/HeaderHook";

// Components
import { UserHeader, UserCard } from "./components";
import { Input, LoadingSpinner } from "../../components/common";
import ErrorPopup from "../../components/common/ErrorPopup";

// Services
import { getUsers, getRoles } from "./services";

const UserAccessControl = () => {
  const { setHeaderContent } = useContext(HeaderContext);

  const [users, setUsers] = useState([]);
  const [initUsers, setInitUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);

  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");

  const getData = async () => {
    try {
      setLoading(true);

      const [usersRes, rolesRes] = await Promise.all([getUsers(), getRoles()]);

      const usersData = await usersRes.json();
      const rolesData = await rolesRes.json();

      setUsers(
        usersData.data.map((user) => {
          const currentRole = rolesData.roles.find((role) => role.BackofficeRoleID === user.role);
          if (currentRole) {
            return { ...user, role: { ...currentRole } };
          }
          return user;
        })
      );
      setInitUsers(
        usersData.data.map((user) => {
          const currentRole = rolesData.roles.find((role) => role.BackofficeRoleID === user.role);
          if (currentRole) {
            return { ...user, role: { ...currentRole } };
          }
          return user;
        })
      );
    } catch (error) {
      setErrorMsg("Алдаа гарлаа. Та дахин оролдоно уу!");
      setShowErrorMsg(true);
    } finally {
      setFetchCount((prev) => prev + 1);
      setLoading(false);
    }
  };

  const filterHandler = () => {
    setLoading(true);

    let usersCopy = [...initUsers];

    if (search) {
      usersCopy = usersCopy.filter((user) => (user.first_name ?? user.email)?.toLowerCase().includes(search.toLowerCase()));
    }

    if (phone) {
      usersCopy = usersCopy.filter((user) => user.phone_number?.toString() === phone);
    }

    setUsers(usersCopy);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setHeaderContent(<UserHeader />);

    return () => {
      setHeaderContent(<></>);
    };
  }, [setHeaderContent]);

  useEffect(() => {
    if (fetchCount > 0) filterHandler();
  }, [initUsers, search, phone, fetchCount]);

  return (
    <>
      <div className={css.container}>
        <div className={css.filters}>
          <div className={`${css.filterWrapper} ${css.name}`}>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="medium"
              placeholder="Нэр/Имэйл"
              icon={<SearchGray />}
              iconposition="left"
              name="searchUser"
            />
          </div>
          <div className={`${css.filterWrapper} ${css.phone}`}>
            <Input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              size="medium"
              placeholder="Утас"
              name="searchUserByPhone"
            />
          </div>
        </div>

        {!loading && users.length > 0 && (
          <div className={css.content}>
            {users.map((user) => {
              return <UserCard key={`user-access-control-user-${user.user_id}`} user={user} />;
            })}
          </div>
        )}

        {loading && (
          <div className={css.spinner}>
            <LoadingSpinner />
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className={css.notFound}>
            <ProfileGray />
            <span>Илэрц олдсонгүй</span>
          </div>
        )}
      </div>

      <ErrorPopup
        show={showErrorMsg}
        message={errorMsg}
        closeHandler={() => {
          setShowErrorMsg(false);
          setErrorMsg("");
          fetchCount >= 3 && getData();
        }}
      />
    </>
  );
};

export default UserAccessControl;

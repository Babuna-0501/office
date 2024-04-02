// CSS
import css from "./addUser.module.css";

// Images
import { CloseDark, SearchGray, ProfileGray } from "../../../assets/icons";

// Components
import { Button, Checkbox, Input, LoadingSpinner, SuccessPopup } from "../../../components/common";
import ErrorPopup from "../../../components/common/ErrorPopup";

// Core Packages
import { useEffect, useState } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";

export const AddUser = (props) => {
  const { closeHandler, users: initUsers, roles, afterCreate, loggedUser } = props;

  const [users, setUsers] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState([...users]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const usersCopy = [...initUsers];

    for (const user of usersCopy) {
      const curRole = roles.find((role) => role.BackofficeRoleID === user.role);

      if (curRole) {
        user.role = { ...curRole };
      }
    }

    setUsers(usersCopy);
  }, [initUsers, roles]);

  useEffect(() => {
    if (users.length > 0) {
      let usersCopy = [...users];

      if (searchName !== "") {
        usersCopy = usersCopy.filter(
          (user) => (user.first_name ?? user.email).toLowerCase()[0] === searchName.toLowerCase()[0] && (user.first_name ?? user.email).toLowerCase().includes(searchName.toLowerCase())
        );
      }

      setFilteredUsers(usersCopy);
    }
  }, [searchName, users]);

  const submitHandler = async () => {
    try {
      if (selectedUser === "" || selectedUser === null) throw new Error("Ажилтан сонгоно уу!");

      setLoading(true);

      const body = {
        user: Number(selectedUser),
        supplierId: Number(loggedUser.company_id.replaceAll("|", "")),
      };
      const url = `https://api2.ebazaar.mn/api/backoffice/users/target`;
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.code === 201) {
        afterCreate({ ...body, _id: resData.data.insertedId });
        setShowSuccess(true);
        return;
      }

      if (resData.code === 400) {
        throw new Error(resData.message ?? "Алдаа гарлаа. Та дахин оролдоно уу!");
      }
    } catch (error) {
      setErrorMsg(error.message);
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={css.container}>
        {/* Header хэсэг */}
        <div className={css.header}>
          <h1 className={css.title}>Ажилтан нэмэх</h1>

          <button disabled={loading} onClick={closeHandler} className={css.closeBtn} type="button">
            <CloseDark />
          </button>
        </div>

        {/* Хайх input */}
        <Input
          disabled={loading}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          size="medium"
          placeholder="Хайх"
          width={329}
          icon={<SearchGray />}
          iconposition="left"
          name="searchUsers"
        />

        {/* Хэрэглэгчдийг харуулах хэсэг */}
        {!loading && (
          <div className={css.users}>
            {filteredUsers.map((user) => {
              return <SingleUserCard key={`target-user-${user.user_id}`} user={user} roles={roles} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />;
            })}
          </div>
        )}

        {loading && (
          <div className={css.spinner}>
            <LoadingSpinner />
          </div>
        )}

        {/* Footer хэсэг */}
        <div className={css.footer}>
          <Button disabled={loading} onClick={closeHandler} variant="secondary" size="large">
            Цуцлах
          </Button>

          <Button onClick={submitHandler} disabled={selectedUser === null || loading} variant="primary" size="large" width={199}>
            Нэмэх
          </Button>
        </div>
      </div>

      <SuccessPopup
        show={showSuccess}
        message={"Ажилтан амжилттай нэмэгдлээ"}
        closeHandler={() => {
          setShowSuccess(false);
          closeHandler();
        }}
      />

      <ErrorPopup show={showErrorMsg} message={errorMsg} closeHandler={() => setShowErrorMsg(false)} />
    </>
  );
};

// Нэг хэрэглэгчийн card
const SingleUserCard = (props) => {
  // Props-оор дамжуулсан утгуудыг салгаж авна
  const { user, selectedUser, setSelectedUser } = props;

  return (
    <div className={`${css.singleUserCard} ${user.user_id === selectedUser && css.checked}`}>
      <Checkbox id={user.user_id} onChange={() => setSelectedUser(user.user_id)} checked={user.user_id === selectedUser} variant="primary" />

      <label htmlFor={user.user_id} className={css.userInfo}>
        <div className={css.userProfile}>{user.profile_picture ? <img src={user.profile_picture} alt={user.first_name ?? user.email ?? "Нэргүй"} /> : <ProfileGray width={22} height={22} />}</div>

        <div className={css.userDetails}>
          <h3>
            {(user.first_name ?? user.email).slice(0, 20)}
            {(user.first_name ?? user.email).length > 20 && "..."}
          </h3>
          <span>{user.role?.Role ?? "Админ"}</span>
        </div>
      </label>
    </div>
  );
};

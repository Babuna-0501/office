import myHeaders from "../../../components/MyHeader/myHeader";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
};

export const getUsers = () => {
  return fetch(`https://api2.ebazaar.mn/api/backoffice/users`, requestOptions);
};

export const getRoles = () => {
  return fetch(`https://api2.ebazaar.mn/api/backoffice/role`, requestOptions);
};

export const getSuppliers = () => {
  return fetch(`https://api2.ebazaar.mn/api/backoffice/suppliers`);
};

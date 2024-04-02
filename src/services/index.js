import myHeaders from "../components/MyHeader/myHeader";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
};

export const getLoggedUser = () => {
  return fetch("https://api2.ebazaar.mn/api/data", requestOptions);
};

export const getSiteData = () => {
  return fetch("https://api.ebazaar.mn/api/site_data", requestOptions);
};

export const getUserRoles = () => {
  return fetch("https://api2.ebazaar.mn/api/backoffice/role", requestOptions);
};

export const getSuppliers = () => {
  return fetch("https://api2.ebazaar.mn/api/backoffice/suppliers", requestOptions);
};

export const getModules = () => {
  return fetch("https://api2.ebazaar.mn/api/module", requestOptions);
};


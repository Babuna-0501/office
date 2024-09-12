import myHeaders from '../components/MyHeader/myHeader';

const requestOptions = {
  method: 'GET',
  headers: myHeaders
};

export const getLoggedUser = () => {
  return fetch(`${process.env.REACT_APP_API_URL2}/api/data`, requestOptions);
};

export const getSiteData = () => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/site_data`,
    requestOptions
  );
};

export const getUserRoles = () => {
  return fetch(
    `${process.env.REACT_APP_API_URL2}/api/backoffice/role`,
    requestOptions
  );
};

export const getSuppliers = () => {
  return fetch(
    `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
    requestOptions
  );
};

export const getModules = () => {
  return fetch(`${process.env.REACT_APP_API_URL2}/api/module`, requestOptions);
};

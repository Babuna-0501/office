import myHeaders from '../../../components/MyHeader/myHeader';

const requestOptions = {
  method: 'GET',
  headers: myHeaders
};

export const getUsers = () => {
  return fetch(
    `${process.env.REACT_APP_API_URL2}/api/backoffice/users`,
    requestOptions
  );
};

export const getRoles = () => {
  return fetch(
    `${process.env.REACT_APP_API_URL2}/api/backoffice/role`,
    requestOptions
  );
};

export const getSuppliers = () => {
  return fetch(`${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`);
};

var myHeaders = new Headers();
myHeaders.append("ebazaar_token", localStorage.getItem("ebazaar_admin_token"));
myHeaders.append("Content-Type", "application/json");
export default myHeaders;

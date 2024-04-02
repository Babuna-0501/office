import { useEffect } from "react";

const Protected = ({ children, permission }) => {
  useEffect(() => {
    if (!permission) {
      window.location.replace("/");
    }
  }, [permission]);

  return permission ? <>{children}</> : null;
};

export default Protected;

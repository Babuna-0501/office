import React, { useContext, useEffect } from "react";
import { HeaderContext } from "../../Hooks/HeaderHook";
import HeaderContent from "../../components/oresh/headerContent/HeaderContent";
const Products = React.lazy(() => import("../../Products/Index"));

const Oresh = ({ children }) => {
  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);
  return <div>{children}</div>;
};

export default Oresh;

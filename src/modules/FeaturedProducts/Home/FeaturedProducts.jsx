// CSS
import css from "./featuredProducts.module.css";

// Contexts
import { HeaderContext } from "../../../Hooks/HeaderHook";
import { GlobalContext } from "../../../Hooks/GlobalContext";

// Components
import { FeaturedProductsHeader } from "./components";

// Core Packages
import { useContext, useEffect } from "react";

const FeaturedProducts = () => {
  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<FeaturedProductsHeader />);
  }, [setHeaderContent]);

  return <div>FeaturedProducts</div>;
};

export default FeaturedProducts;

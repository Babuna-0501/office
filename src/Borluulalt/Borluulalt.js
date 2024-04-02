import { useContext, useEffect } from "react";
import { ListBorluulalt } from "./ListBorluulalt";
import css from "./borluulalt.module.css";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";
import { HeaderBorluulalt } from "./HeaderBorluulalt";

export const Borluulalt = () => {
  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<><p>Борлуулалт</p></>);
    };
  }, []);

  return (
    <div className={css.container}>
      <HeaderBorluulalt />

      <ListBorluulalt />
    </div>
  );
};

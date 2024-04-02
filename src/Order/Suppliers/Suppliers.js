import React, { useState, useEffect } from "react";
import myHeaders from "../../components/MyHeader/myHeader";
import css from "./supploers.module.css";
import checkboxicon from "../../assets/check box.svg";
import chechboxchecked from "../../assets/Tick Square on 2.svg";

const Suppliers = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Shuurhai",
    },
    {
      id: 2,
      name: "Ebazaar",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    // if (searchValue !== null && searchValue.length < 4) {
    //     return;
    // }

    let url = `https://api2.ebazaar.mn/api/backoffice/suppliers`;
    // if (searchValue !== null) {
    //     url = `https://api2.ebazaar.mn/api/backoffice/suppliers?name=${searchValue}`;
    // }
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        let vv = response.data.map((item) => {
          return {
            ...item,
            checked: false,
          };
        });
        setData(vv);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  const CheckedHanlder = (item) => {
    // console.log("item", item);
    let updatedata = data.map((x) => {
      if (x.id === item.id) {
        return {
          ...x,
          checked: x.checked === true ? false : true,
        };
      }
      return x;
    });

    setData(updatedata);
  };
  const OpenHandler = () => {
    setOpen((prev) => !prev);
  };
  return (
		<div className={css.container}>
			<div className={css.header} onClick={OpenHandler}>
				{/* <input
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                /> */}
				<span>Нийлүүлэгч</span>
			</div>
			{open === true && (
				<div className={css.wrapper}>
					{data &&
						data
							.sort(function (a, b) {
								if (a.name < b.name) {
									return -1;
								}

								return 0;
							})
							.map((item, index) => {
								return (
									<div
										className={css.onesupplier}
										key={index}
										onClick={() => CheckedHanlder(item)}
									>
										<img
											src={
												item.checked === true ? chechboxchecked : checkboxicon
											}
											alt="checkbox icon"
										/>{" "}
										<span>{item.name}</span>
									</div>
								);
							})}
				</div>
			)}
		</div>
	);
};

export default Suppliers;

import React, { useEffect, useState } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";
const Channel = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = [1, 2, 3, 4, 5, 6, 7];
  useEffect(() => {
    fetch(`https://api.ebazaar.mn/api/site_data`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <div>
      <div>Сувгийн тохиргоо</div>
      <div>
        {data &&
          filteredData.map((item) => {
            data.business_types
              .filter((x, i) => x.channel_id === item)
              .map((x, i) => {
                return <div key={i}>{x.business_type_name}</div>;
              });
          })}
      </div>
    </div>
  );
};

export default Channel;

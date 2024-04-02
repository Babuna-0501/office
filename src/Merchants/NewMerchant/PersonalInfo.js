import React, { useContext, useState, useEffect } from "react";
import css from "./personalinfo.module.css";
import ProductReportHook from "../../Hooks/ProductsReportHook";
function PersonalInfo({ formData, setFormData }) {
  const [locationData, setLocationData] = useState([]);
  const sitedatactx = useContext(ProductReportHook);

  useEffect(() => {
    setLocationData(sitedatactx.sitedata);
  }, []);
  console.log("locationdata", locationData);

  return (
    <div className={css.container}>
      <div className={css.wrappercontent}>
        {/* <span>Үйлчилгээний цэгийн мэдээлэл</span> */}
      </div>{" "}
      <div className={css.inputwrapper}>
        <select
          value={formData.businessType}
          onChange={(event) =>
            setFormData({
              ...formData,
              businessType: event.target.value,
            })
          }
        >
          <option>---Үйл ажиллагааны төрөл---</option>
          {locationData.business_types?.map((x) => {
            return (
              <option value={x.business_type_id}>{x.business_type_name}</option>
            );
          })}
        </select>
      </div>
      <div className={css.inputwrapper}>
        <input
          type="text"
          placeholder="Үйлчилгээний цэгийн нэр"
          value={formData.firstName}
          onChange={(e) => {
            setFormData({ ...formData, shopName: e.target.value });
          }}
        />
      </div>
      <div className={css.inputwrapper}>
        <input
          type="number"
          placeholder="Утасны дугаар"
          value={formData.firstName}
          onChange={(e) => {
            setFormData({ ...formData, phoneNumber1: e.target.value });
          }}
        />
      </div>
      <div className={css.inputwrapper}>
        <input
          type="number"
          placeholder="Утасны дугаар"
          value={formData.firstName}
          onChange={(e) => {
            setFormData({ ...formData, phoneNumber2: e.target.value });
          }}
        />
      </div>
      <div className={css.wrappercontent}>
        <span>Үйлчилгээний цэгийн хаяг</span>
      </div>{" "}
      <div className={css.inputwrapper}>
        <select
          value={formData.locationCity}
          onChange={(event) =>
            setFormData({
              ...formData,
              locationCity: event.target.value,
            })
          }
        >
          <option>---Хот/Аймаг---</option>
          {locationData.location
            ?.filter((item) => item.parent_id === 0)
            .map((x) => {
              return <option value={x.location_id}>{x.location_name}</option>;
            })}
        </select>
      </div>{" "}
      <div className={css.inputwrapper}>
        <select
          value={formData.locationDistrict}
          onChange={(event) =>
            setFormData({
              ...formData,
              locationDistrict: event.target.value,
            })
          }
        >
          <option>---Дүүрэг/Сум---</option>
          {locationData.location
            ?.filter((item) => item.parent_id == formData.locationCity)
            .map((x) => {
              return (
                <option
                  disabled={formData.locationCity ? "" : "disabled"}
                  value={x.location_id}
                >
                  {x.location_name}
                </option>
              );
            })}
        </select>
      </div>
      <div className={css.inputwrapper}>
        <select
          value={formData.locationKhoroo}
          onChange={(event) =>
            setFormData({
              ...formData,
              locationKhoroo: event.target.value,
            })
          }
        >
          <option>---Хороо/Баг---</option>
          {locationData.location
            ?.filter((item) => item.parent_id == formData.locationDistrict)
            .map((x) => {
              return (
                <option
                  disabled={formData.locationKhoroo ? "" : "disabled"}
                  value={x.location_id}
                >
                  {x.location_name}
                </option>
              );
            })}
        </select>
      </div>
      <div className={css.inputwrapper}>
        <input
          type="text"
          placeholder="Дэлгэрэнгүй хаяг."
          value={formData.address}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;

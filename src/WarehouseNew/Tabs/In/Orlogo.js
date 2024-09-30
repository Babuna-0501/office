import { useState, useEffect, useContext } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";
import { ModuleContext } from "../../index";
import List from "./List";
import Form from "./Form";
import ZarlagaForm from "../Zarlaga/Form";
import { saveAs } from "file-saver";

const FormattedDate = () => {
  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month =
    currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1;
  const day =
    currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate();
  return {
    currentDate: year + "-" + month + "-" + day,
    year: year,
    month: month,
    day: day,
  };
};

const Orlogo = (props) => {
  let foo = FormattedDate();
  const [startDate, setStartDate] = useState(
    foo["year"] + "-" + foo["month"] + "-" + "01"
  );
  const [endDate, setEndDate] = useState(foo["currentDate"]);
  const context = useContext(ModuleContext);
  const companyId = context.companyId.replace(/\D/g, "");
  const [form, setForm] = useState(false);
  const [formZarlaga, setFormZarlaga] = useState(false);
  const [data, setData] = useState(null);
  const [ognoo, setOgnoo] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);
  const sentRequest = () => {
    fetchData();
  };
  const fetchData = (params = "") => {
    const url = `https://api2.ebazaar.link/api/shipment?owner=${
      props.wh
    }&startDate=${startDate}&endDate=${endDate}&products=true&createdDate=true&${params}&limit=${
      page * 50
    }`;
    console.log(url);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        console.log(response.data.length);
        setData(response.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  const clickDownload = async (ids) => {
    let id =
      ids.length == 0
        ? data.map((d) => '"' + d._id + '"')
        : ids.map((id) => '"' + id.id + '"');
    let headers = myHeaders;
    headers.append("Accept", "application/pdf");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      responseType: "arraybuffer",
    };

    const url = `${process.env.REACT_APP_API_URL2}/api/shipment/report?shipmentIds=[${id}]`;
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      // if (!contentType || !contentType.includes('application/pdf')) {
      // 	throw new Error('Response is not a PDF');
      // }

      const blob = await response.blob();
      saveAs(blob, `Тайлан ${formattedDate}.pdf`);
    } catch (error) {
      console.error(error);
    }
  };

  const foobar = (blahblah) => {
    //if(blahblah === 'today' || blahblah === 'thismonth' || blahblah === 'thisweek') {
    //fetchData()
    //}
  };
  return data ? (
    <>
      <List
        fetchData={fetchData}
        data={data}
        setForm={setForm}
        setFormZarlaga={setFormZarlaga}
        foobar={foobar}
        setDownload={clickDownload}
        setOgnoo={setOgnoo}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        page={page}
        setPage={setPage}
      />
      {form ? (
        <Form
          data={data}
          setForm={setForm}
          form={form}
          foobar={foobar}
          sentRequest={sentRequest}
          ognoo={ognoo}
          warehouseId={props.wh}
        />
      ) : null}
      {formZarlaga ? (
        <ZarlagaForm
          setFormZarlaga={setFormZarlaga}
          data={data}
          form={formZarlaga}
          foobar={foobar}
          sentRequest={sentRequest}
          ognoo={ognoo}
          warehouseId={props.wh}
        />
      ) : null}
    </>
  ) : (
    <div>Түр хүлээнэ үү...</div>
  );
};

export default Orlogo;

import { CSVLink, CSVDownload } from "react-csv";

function CSV(props) {
  console.log("CSV props: ", props);

  const headers = [
    {label:"id",key:""}
  ]

  return <CSVLink data={props.data}>Тайлан татах</CSVLink>;
}

export default CSV;

import { CSVLink, CSVDownload } from "react-csv";

function CSV(props) {
  return <CSVLink data={props.data}>Тайлан татах</CSVLink>;
}

export default CSV;

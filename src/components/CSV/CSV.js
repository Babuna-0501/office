import { CSVLink, CSVDownload } from "react-csv";

function CSV(props) {
  return (
    <CSVLink data={props.data}>
      <span
        style={{
          marginLeft: "16px",
          color: "#00ADD0",
          fontWeight: "700",
          fontSize: "16px",
        }}
      >
        {props.name}
      </span>
    </CSVLink>
  );
}

export default CSV;

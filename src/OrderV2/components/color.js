const getColorForStatus = (statusId, shipmentStatus) => {
  let color = "";
  let name = "";
  let fontColor = "";
  let scolor = "";
  let sname = "";
  let sfontColor = "";
  switch (shipmentStatus) {
    case 14: // Shipment status
      // case 6: // Shipment status
      scolor = "#E3CE0E";
      sname = "Ачигдсан";
      sfontColor = "#fff";
      break;
    case 15: // Shipment status
      // case 7: // Shipment status
      scolor = "#CCCCCC";
      sname = "Хойшилсон";
      sfontColor = "#fff";
      break;
  }

  switch (statusId) {
    case 1: // Pending
      color = "#eceff1";
      name = "Хүлээгдэж буй";
      fontColor = "#808080";
      break;
    case 2: // Confirmed
      color = "#00add0";
      name = "Баталгаажсан";
      fontColor = "#fff";
      break;
    case 3: // Delivered
      color = "#58dd42";
      name = "Хүргэгдсэн";
      fontColor = "#fff";
      break;
    case 4: // Paid
      color = "#5cd1be";
      name = "Төлөгдсөн";
      fontColor = "#fff";
      break;
    case 5: // Canceled
      color = "red";
      name = "Цуцлагдсан";
      fontColor = "#fff";
      break;

    case "all":
      color = "transparent";
      name = "All Statuses";
      fontColor = "#000";
      break;
    default:
      color = "white";
      name = "Unknown";
      fontColor = "#000";
  }

  return { color, name, fontColor, scolor, sname, sfontColor };
};
export const getChangeStatusThemes = (statusId, shipmentStatus) => {
  let color = "";
  let name = "";
  let fontColor = "";
  let code = 0;
  let scolor = "";
  let sname = "";
  let sfontColor = "";
  let scode = 0;
  switch (shipmentStatus) {
    case 14: // Shipment status
      // case 6: // Shipment status
      scolor = "#E3CE0E";
      sname = "Хойшилсон";
      sfontColor = "#fff";
      scode = 15;
      break;
    case 15: // Shipment status
      // case 7: // Shipment status
      scolor = "#58dd42";
      sname = "Хүргэгдсэн";
      scode = 3;
      sfontColor = "#fff";
      break;
  }
  switch (statusId) {
    case 5: // Pending
      color = "#58dd42";
      code = 3;
      name = "Хүргэгдсэн";
      fontColor = "#fff";
      break;
    case 1: // Confirmed
      color = "#00add0";
      name = "Баталгаажсан";
      code = 2;
      fontColor = "#fff";
      break;
    case 2: // Delivered
      color = "#58dd42";
      name = "Хүргэгдсэн";
      code = 3;
      fontColor = "#fff";
      break;
    case 3: // Paid
      color = "#5cd1be";
      name = "Төлөгдсөн";
      code = 4;
      fontColor = "#fff";
      break;
    case 4: // Canceled
      color = "red";
      code = 5;
      name = "Цуцлагдсан";
      fontColor = "#fff";
      break;

    case "all":
      color = "transparent";
      name = "All Statuses";
      fontColor = "#000";
      break;
    default:
      color = "white";
      name = "Unknown";
      fontColor = "#000";
  }

  return { color, name, fontColor, code, scolor, sname, sfontColor, scode };
};

export default getColorForStatus;

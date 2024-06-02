const getColorForStatus = (statusId) => {
  let color = "";
  let name = "";
  let fontColor = "";

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
    case 14: // Shipment status
      // case 6: // Shipment status
      color = "#E3CE0E";
      name = "Ачигдсан";
      fontColor = "#fff";
      break;
    case 15: // Shipment status
      // case 7: // Shipment status
      color = "#CCCCCC";
      name = "Хойшилсон";
      fontColor = "#fff";
      break;
    default:
      color = "white";
      name = "Unknown";
      fontColor = "#000";
  }

  return { color, name, fontColor };
};
export const getChangeStatusThemes = (statusId) => {
  let color = "";
  let name = "";
  let fontColor = "";
  let code = 0;

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
    case 14: // Shipment status
      // case 6: // Shipment status
      color = "#E3CE0E";
      name = "Хойшилсон";
      fontColor = "#fff";
      code = 15;
      break;
    case 15: // Shipment status
      // case 7: // Shipment status
      color = "#58dd42";
      name = "Хүргэгдсэн";
      code = 3;
      fontColor = "#fff";
      break;
    default:
      color = "white";
      name = "Unknown";
      fontColor = "#000";
  }

  return { color, name, fontColor, code, };
};

export default getColorForStatus;

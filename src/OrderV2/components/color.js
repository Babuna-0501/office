const getColorForStatus = (statusId) => {
    let color = ''; 
    let name = ''; 
    let fontColor = '';

    switch (statusId) {
      case 1: // All status
        color = ''; 
        name = 'All';
        fontColor = ''
        break;
      case 2: // Pending
        color = '#eceff1'; 
        name = 'Хүлээгдэж буй';
        fontColor = '#808080'
        break;
      case 3: // Confirmed
        color = '#00add0'; 
        name = 'Баталгаажсан';
        fontColor = '#fff'
        break;
      case 4: // Delivered
        color = '#58dd42'; 
        name = 'Хүргэгдсэн';
        fontColor = '#fff'
        break;
      case 5: // Canceled
        color = 'red'; 
        name = 'Цуцлагдсан';
        fontColor = '#fff'
        break;
      default:
        color = 'white'; 
        name = 'Unknown';
        fontColor = '#000'
    }
  
    return { color, name, fontColor };
  };
  
  export default getColorForStatus;
  


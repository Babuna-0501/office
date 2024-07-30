export const formatNumber = number => {
  if (number) {
    const [integerPart, fractionalPart] = number.toString().split('.');
    const formattedIntegerPart = parseInt(integerPart, 10).toLocaleString(
      'en-US'
    );
    const formattedFractionalPart = fractionalPart
      ? fractionalPart.replace(/0+$/, '').substring(0, 3)
      : '';

    return formattedFractionalPart
      ? `${formattedIntegerPart}.${formattedFractionalPart}`
      : formattedIntegerPart;
  } else {
    return 0;
  }
};

export const productHeaders = [
  { Header: 'Дугаар', accessor: '_id', parameter: '_id' },
  { Header: 'Зураг', accessor: 'image', parameter: 'image' },
  { Header: 'Бүтээгдэхүүний нэр', accessor: 'name', parameter: 'name' },
  { Header: 'SKU', accessor: 'sku', parameter: 'sku' },
  // { Header: 'Үнэ', accessor: 'locations', parameter: 'locations' },
  // {
  //   Header: 'Сагслах тоо хэмжээ',
  //   accessor: 'locations',
  //   parameter: 'locations'
  // },
  { Header: 'Үлдэгдэл', accessor: 'stock', parameter: 'stock' }
  // { Header: 'Захиалгын хэмжээ', accessor: 'pickpack', parameter: '_id' }
];

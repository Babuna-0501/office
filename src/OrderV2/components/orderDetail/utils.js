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
  { Header: 'Дугаар', accessor: '_id', parameter: '_id', isFilter: true },
  { Header: 'Зураг', accessor: 'image', parameter: 'image', isFilter: false },
  {
    Header: 'Бүтээгдэхүүний нэр',
    accessor: 'name',
    parameter: 'name',
    isFilter: true
  },
  { Header: 'SKU', accessor: 'sku', parameter: 'sku', isFilter: true },
  { Header: 'Үнэ', accessor: 'customPrice', parameter: 'customPrice' },
  {
    Header: 'Сагслах хэмжээ',
    accessor: 'customQuantity',
    parameter: 'customQuantity'
  },
  { Header: 'Үлдэгдэл', accessor: 'stock', parameter: 'stock', isFilter: true },
  { Header: 'Захиалгын хэмжээ', accessor: 'quantity', parameter: 'quantity' }
];

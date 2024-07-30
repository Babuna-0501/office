import myHeaders from '../../components/MyHeader/myHeader';

function PromoProductCheck(ids) {
  let url = `${process.env.REACT_APP_API_URL2}/api/discounts?product_ids=[${ids}]`;
  // console.log("url++++++++++----------", url);
  let result;
  fetch(url, {
    method: 'GET',
    headers: myHeaders
  })
    .then(re => re.json())
    .then(res => {
      // console.log("res res", res);
      result = res;
    })
    .catch(error => {
      console.log('promocheck error', error);
    });
  return result;
}

export default PromoProductCheck;

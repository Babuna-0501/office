import React, { useEffect, useContext, useState } from 'react';
import css from './sfa_tailan.module.css';
import myHeaders from '../components/MyHeader/myHeader';
import { HeaderContext } from '../Hooks/HeaderHook';

import { DashboardHeader } from './Header';
import { SideBar } from './SideBar';
import { BodyHeader } from './component/BodyHeader';
import { BarChart } from './component/BarChart';
import { DonutChartPayment } from './component/DonutChartPayment';
import { DonutChartBrand } from './component/DonutChartBrand';
import { ColumnChartSupplier } from './component/ColumnChartSupplier';
import { ColumnChartTradeShop } from './component/ColumnChartTradeshop';
import { MapDashboard } from './component/Map';

const SfaTailan = props => {
  const { userData, categories, brands } = props;
  const { setHeaderContent } = useContext(HeaderContext);

  const today = new Date();
  const [startDate, setStartDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`
  );
  const [endDate, setEndDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(today.getDate()).padStart(2, '0')}`
  );
  const [searchDistrict, setSearchDistrict] = useState(null);

  const goalAmount = 30000000;
  const goalMerchants = 30;

  const [datas, setDatas] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [belenTotal, setBelenTotal] = useState(0);
  const [dansTotal, setDansTotal] = useState(0);
  const [zeelTotal, setZeelTotal] = useState(0);
  const [belenDansTotal, setBelenDansTotal] = useState(0);
  const [belenZeelTotal, setBelenZeelTotal] = useState(0);
  const [dansZeelTotal, setDansZeelTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const [merchantCount, setMerchantCount] = useState([]);
  const [topDistricts, setTopDistricts] = useState([]);
  const [categoryAmounts, setCategoryAmounts] = useState();
  const [brandAmounts, setBrandAmounts] = useState();
  const [filtCategories, setFiltCategories] = useState();
  const [filteredBrands, setFilteredBrands] = useState();
  const [maxOrderProduct, setMaxOrderProduct] = useState([]);
  const [minOrderProduct, setMinOrderProduct] = useState([]);
  const [minOrderId, setMinOrderId] = useState(null);
  const [maxOrderId, setMaxOrderId] = useState(null);

  const [backOffUsers, setBackOffUsers] = useState([]);
  const [backOffData, setBackOffData] = useState([]);

  const [tradeData, setTradeData] = useState([]);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  useEffect(() => {
    setHeaderContent(
      <DashboardHeader
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setSearchDistrict={setSearchDistrict}
      />
    );
    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/users?company=${userData?.company_id}`,
      requestOptions
    )
      .then(res => res.json())
      .then(response => setBackOffUsers(response.data));
  }, []);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_API_URL2
      }/orders?order_type=1&order_start=${startDate}&order_end=${endDate}&district=${
        searchDistrict ? searchDistrict : ''
      }&page=0`,
      requestOptions
    )
      .then(res => res.json())
      .then(response => setDatas(response.data));
  }, [startDate, endDate, searchDistrict]);

  useEffect(() => {
    if (datas.length > 0) {
      let total = 0;
      let belenTololt = 0;
      let dansTololt = 0;
      let zeelTololt = 0;
      let belenDansTololt = 0;
      let belenZeelTololt = 0;
      let dansZeelTololt = 0;
      let totalQuantity2 = 0;

      let merchantIds = [];
      let backOffUserIds = [];
      let backOffUserAmounts = [];

      let brandIds = [];
      let brandAmount = [];
      let filtBrands = [];

      let categoryIds = [];
      let catAmounts = [];
      let filtCats = [];

      let totalBGD = 0;
      let totalBHD = 0;
      let totalBND = 0;
      let totalBZD = 0;
      let totalChD = 0;
      let totalHUD = 0;
      let totalND = 0;
      let totalSBD = 0;
      let totalSHD = 0;

      let minOrderAmount = datas[0].line[0].amount;
      let maxOrderAmount = datas[0].line[0].amount;
      let minOrderId = null;
      let maxOrderId = null;

      let newTopDistricts = [];

      const newData = datas.reduce(
        (
          result,
          { tradeshop_id, back_office_user, grand_total, tradeshop_name }
        ) => {
          const existingEntry = result.find(
            entry => entry.tradeId === tradeshop_id
          );

          if (existingEntry) {
            const existingBackUser = existingEntry.backOff.find(
              backOffEntry => backOffEntry.backId === back_office_user
            );

            if (existingBackUser) {
              existingBackUser.amount += grand_total;
            } else {
              existingEntry.backOff.push({
                backId: back_office_user,
                amount: grand_total
              });
            }
          } else {
            result.push({
              tradeId: tradeshop_id,
              tradeName: tradeshop_name,
              backOff: [{ backId: back_office_user, amount: grand_total }]
            });
          }
          return result;
        },
        []
      );

      datas.map(data => {
        total += data.grand_total;
        if (!merchantIds.includes(data.tradeshop_id)) {
          merchantIds.push(data.tradeshop_id);
        } else {
        }

        if (!backOffUserIds.includes(data.back_office_user)) {
          backOffUserIds.push(data.back_office_user);
        } else {
        }

        if (backOffUserIds.length > 0) {
          let existBackOffUser = [];
          backOffUserIds.forEach(userId => {
            const existBackOffUser2 = backOffUserAmounts.find(
              item => item && item.id === userId
            );
            existBackOffUser = existBackOffUser2;
          });
          if (existBackOffUser) {
            existBackOffUser.amount += data.grand_total;
          } else {
            backOffUserAmounts.push({
              id: data.back_office_user,
              amount: data.grand_total
            });
          }
        } else {
        }

        if (JSON.parse(data.order_data)?.payment.paymentId === 0) {
          dansTololt += data.grand_total;
        } else if (JSON.parse(data.order_data)?.payment.paymentId === 1) {
          belenTololt += data.grand_total;
        } else if (JSON.parse(data.order_data)?.payment.paymentId === 2) {
          zeelTololt += data.grand_total;
        } else if (JSON.parse(data.order_data)?.payment.paymentId === 3) {
          belenDansTololt += data.grand_total;
        } else if (JSON.parse(data.order_data)?.payment.paymentId === 4) {
          belenZeelTololt += data.grand_total;
        } else if (JSON.parse(data.order_data)?.payment.paymentId === 5) {
          dansZeelTololt += data.grand_total;
        } else {
        }

        data.line.map(pro => {
          totalQuantity2 += pro.quantity;

          if (minOrderAmount > pro.amount) {
            minOrderAmount = pro.amount;
            minOrderId = pro.order_detail_id;
          } else {
            // minOrderId = datas[0].line[0].order_detail_id;
          }

          if (maxOrderAmount < pro.amount) {
            maxOrderAmount = pro.amount;
            maxOrderId = pro.order_detail_id;
          } else {
            // maxOrderId = datas[0].line[0].order_detail_id;
          }

          if (!brandIds.includes(pro.product_brand_id)) {
            brandIds.push(pro.product_brand_id);
          } else {
          }

          if (brandIds.length > 0) {
            let existBrand2 = [];
            brandIds.forEach(brandId => {
              const existBrand = brandAmount.find(
                item => item && item.id === brandId
              );
              existBrand2 = existBrand;
            });
            if (existBrand2) {
              existBrand2.amount += pro.amount;
            } else {
              brandAmount.push({
                id: pro.product_brand_id,
                amount: pro.amount
              });
            }
          } else {
          }

          if (!categoryIds.includes(pro.product_type_id)) {
            categoryIds.push(pro.product_type_id);
          }

          if (categoryIds.length > 0) {
            let existCategory2 = [];
            categoryIds.forEach(categoryId => {
              const existCategory = catAmounts.find(
                item => item && item.id === categoryId
              );
              existCategory2 = existCategory;
            });
            if (existCategory2) {
              existCategory2.amount += pro.amount;
            } else {
              catAmounts.push({ id: pro.product_type_id, amount: pro.amount });
            }
          } else {
          }
        });

        if (data.tradeshop_district === '2') {
          totalBND += data.grand_total;
        } else if (data.tradeshop_district === '3') {
          totalBHD += data.grand_total;
        } else if (data.tradeshop_district === '4') {
          totalBGD += data.grand_total;
        } else if (data.tradeshop_district === '5') {
          totalBZD += data.grand_total;
        } else if (data.tradeshop_district === '6') {
          totalND += data.grand_total;
        } else if (data.tradeshop_district === '7') {
          totalSHD += data.grand_total;
        } else if (data.tradeshop_district === '8') {
          totalSBD += data.grand_total;
        } else if (data.tradeshop_district === '9') {
          totalHUD += data.grand_total;
        } else if (data.tradeshop_district === '10') {
          totalChD += data.grand_total;
        } else {
        }
      });

      if (
        totalBGD > 0 ||
        totalBHD > 0 ||
        totalBND > 0 ||
        totalBZD > 0 ||
        totalChD > 0 ||
        totalHUD > 0 ||
        totalND > 0 ||
        totalSBD > 0 ||
        totalSHD > 0
      ) {
        let totalDistrictArray = [
          totalBGD,
          totalBHD,
          totalBND,
          totalBZD,
          totalChD,
          totalHUD,
          totalND,
          totalSBD,
          totalSHD
        ];

        function compareNumbers(a, b) {
          return a - b;
        }
        const sortedTotalDistrict = totalDistrictArray
          .sort(compareNumbers)
          .slice(3)
          .reverse();

        sortedTotalDistrict.map(total => {
          if (total === totalBGD) {
            newTopDistricts.push({
              Баянгол: new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(total)
            });
          } else if (total === totalBHD) {
            newTopDistricts.push({
              Багахангай: new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(total)
            });
          } else if (total === totalBND) {
            newTopDistricts.push({
              Багануур: new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(total)
            });
          } else if (total === totalBZD) {
            newTopDistricts.push({
              Баянзүрх: new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(total)
            });
          } else if (total === totalChD) {
            newTopDistricts.push({
              Чингэлтэй: new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(total)
            });
          } else if (total === totalHUD) {
            newTopDistricts.push({
              'Хан-Уул': new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(total)
            });
          } else if (total === totalND) {
            newTopDistricts.push({
              Налайх: new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(total)
            });
          } else if (total === totalSBD) {
            newTopDistricts.push({
              Сүхбаатар: new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(total)
            });
          } else if (total === totalSHD) {
            newTopDistricts.push({
              Сонгинохайрхан: new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short'
              }).format(total)
            });
          } else {
            newTopDistricts.push([]);
          }
        });
      }

      if (categoryIds.length > 0) {
        categoryIds.map(cateId => {
          categories.map(cate => {
            if (cate.id === cateId) {
              filtCats.push(cate);
            }
          });
        });
      } else {
      }

      if (brandIds.length > 0) {
        brandIds.map(brandId => {
          brands.map(brand => {
            if (brand.BrandID === brandId) {
              filtBrands.push(brand);
            }
          });
        });
      } else {
      }

      setTimeout(() => {
        setTotalAmount(total);
        setBelenTotal(belenTololt);
        setDansTotal(dansTololt);
        setZeelTotal(zeelTololt);
        setBelenDansTotal(belenDansTololt);
        setBelenZeelTotal(belenZeelTololt);
        setDansZeelTotal(dansZeelTololt);
        setMerchantCount(merchantIds.length);
        setTotalQuantity(totalQuantity2);
        setTopDistricts(newTopDistricts);
        setCategoryAmounts(catAmounts);
        setBrandAmounts(brandAmount);
        setFiltCategories(filtCats);
        setFilteredBrands(filtBrands);
        setBackOffData(backOffUserAmounts);
        setTradeData(newData);
        setMinOrderId(minOrderId);
        setMaxOrderId(maxOrderId);
      }, '500');
    }
  }, [datas, totalAmount, brands, categories]);

  useEffect(() => {
    const maxProductDetail = datas.filter(data =>
      data.line.some(line => line.order_detail_id === maxOrderId)
    );

    const minProductDetail = datas.filter(data =>
      data.line.some(line => line.order_detail_id === minOrderId)
    );

    if (maxProductDetail.length > 0 && minProductDetail.length > 0) {
      const minDetail = minProductDetail[0].line.filter(
        line => line.order_detail_id === minOrderId
      );
      const maxDetail = maxProductDetail[0].line.filter(
        line => line.order_detail_id === maxOrderId
      );

      setMaxOrderProduct([
        {
          date: maxProductDetail[0].order_date,
          tradeName: maxProductDetail[0].tradeshop_name,
          backOffId: maxProductDetail[0].back_office_user
        },
        ...maxDetail
      ]);

      setMinOrderProduct([
        {
          date: minProductDetail[0].order_date,
          tradeName: minProductDetail[0].tradeshop_name,
          backOffId: minProductDetail[0].back_office_user
        },
        ...minDetail
      ]);
    } else {
    }
  }, [minOrderId, maxOrderId, datas]);

  return (
    <div className={css.container}>
      <div className={`${css.body}  ${css.chartParentColumn}`}>
        <BodyHeader
          goalAmount={goalAmount}
          totalAmount={totalAmount}
          goalMerchants={goalMerchants}
          merchantLength={merchantCount}
          belenTotal={belenTotal}
          dansTotal={dansTotal}
          totalQuantity={totalQuantity}
          topDistricts={topDistricts}
        />

        <div className={`${css.bodyCharts}  ${css.chartParentRow}`}>
          <div className={`${css.chartLeft}  ${css.chartParentColumn}`}>
            <div className={css.chartPart}>
              <h3>Мерчант/Борлуулалт/</h3>
              <div className={css.chartMerchant}>
                <BarChart
                  backOffData={backOffData}
                  backOffUsers={backOffUsers}
                />
              </div>
            </div>

            <div className={css.chartPart}>
              <h3>Борлуулалт/Брэнд/</h3>
              <div className={css.chartBrand}>
                <DonutChartBrand
                  amounts={brandAmounts}
                  brands={filteredBrands}
                  totalAmount={totalAmount}
                />
              </div>
            </div>
          </div>

          <div className={`${css.chartMiddleRight}  ${css.chartParentRow}`}>
            <div className={`${css.chartMiddle}  ${css.chartParentColumn}`}>
              <div className={css.chartPart}>
                <h3>Төлбөрийн хэлбэр</h3>
                <div className={css.chartPaymentType}>
                  <DonutChartPayment
                    totalAmount={totalAmount}
                    belenTotal={belenTotal}
                    dansTotal={dansTotal}
                    zeelTotal={zeelTotal}
                    belenDansTotal={belenDansTotal}
                    belenZeelTotal={belenZeelTotal}
                    dansZeelTotal={dansZeelTotal}
                  />
                </div>
              </div>

              <div className={css.chartPart}>
                <h3>Борлуулалт/Дэд Ангилал/</h3>
                <div className={css.chartSupplier}>
                  <ColumnChartSupplier
                    amounts={categoryAmounts}
                    categories={filtCategories}
                  />
                </div>
              </div>
            </div>
            <div className={`${css.chartRight}  ${css.chartParentColumn}`}>
              <div className={css.chartPart}>
                <h3>Мерчант/Худалдааны цэг/</h3>
                <div
                  className={css.chartTradeshop}
                  id='scrollableDiv'
                  style={{ overflow: 'scroll', overflowX: 'hidden' }}
                >
                  <ColumnChartTradeShop
                    tradeData={tradeData}
                    backOffUsers={backOffUsers}
                  />
                </div>
              </div>
              <div className={`${css.chartLocation}  ${css.chartPart}`}>
                <MapDashboard datas={datas} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={css.sidebar}>
        <SideBar
          maxOrderProduct={maxOrderProduct}
          minOrderProduct={minOrderProduct}
          backOffUsers={backOffUsers}
        />
      </div>
    </div>
  );
};

export default SfaTailan;

import css from './vatProduct.module.css';
import { styles } from '../style';
import { useContext, useState } from 'react';
import Ctx from '../hooks/context';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import SideBar from './sideBar';
import { replaceImageUrl } from '../../utils';

const VatProduct = () => {
  const { page, setPage, products, setProducts, setIsSideBar, setSideBarData } =
    useContext(Ctx);
  console.log('productsssssssssssss', products);
  const [selectedProd, setSelectedProd] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedProd(prevSelected => [...prevSelected, item]);
    } else {
      setSelectedProd(prevSelected =>
        prevSelected.filter(selectedItem => selectedItem !== item)
      );
    }
  };
  console.log('selectedProddddddddddddddd', selectedProd);
  const [selectedZoneIds, setSelectedZoneIds] = useState([]);

  // Callback function to save the selected zone ids
  const handleSaveSelectedZoneIds = zoneIds => {
    setSelectedZoneIds(zoneIds);
    console.log('selectedZoneIds', selectedZoneIds);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={css.ProductMainContainer}>
      {/* <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      /> */}
      {filteredProducts.map((item, index) => {
        return (
          <div className={css.ProductContainer} key={item._id}>
            <div></div>
            <div
              style={{
                ...styles.checkboxcontainer,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <input
                type='checkbox'
                onChange={event => handleCheckboxChange(event, item)}
              />
              <span>{item._id}</span>
            </div>
            <div
              className={css.ClickContainer}
              onClick={() => {
                setIsSideBar(true);
                setSideBarData(item);
              }}
            >
              <div
                style={{
                  ...styles.supplierId
                }}
              >
                <span>{item.supplier_id}</span>
              </div>
              <div className={css.productImage}>
                <img src={replaceImageUrl(item.image[0])} alt={item.name} />
              </div>
              <div style={{ ...styles.productName }}>
                <span>{item.name}</span>
              </div>
              <div style={{ ...styles.barCode }}>
                <span>{item.bar_code}</span>
              </div>
              <div style={{ ...styles.SKU }}>
                <span>{item.sku}</span>
              </div>
            </div>
          </div>
        );
      })}
      <SideBar
        onSaveSelectedZoneIds={handleSaveSelectedZoneIds}
        selectedProd={selectedProd}
      />
    </div>
  );
};

export default VatProduct;

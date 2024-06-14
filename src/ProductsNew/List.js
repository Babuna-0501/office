import { useState, useEffect, useRef } from 'react';
import myHeaders from '../components/MyHeader/myHeader';

const List = (props) => {
    const [data, setData] = useState([]);
    const [searchID, setSearchID] = useState('');
    const [searchName, setSearchName] = useState('');
    // const [searchBrand, setSearchBrand] = useState()
    const [searchBarcode, setSearchBarcode] = useState('');
    const [searchSku, setSearchSku] = useState('');
    const search = useRef({});
    const page = useRef(1);
    const fetchingData = useRef(false);
    let fetchedProducts = useRef([]);
    const widths = props.widths;
    const renderHTML = [];
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let filteredData = data;
        if (searchID.trim() !== '') {
            filteredData = filteredData.filter(item => item._id.toString().includes(searchID));
        }
        if (searchName.trim() !== '') {
            filteredData = filteredData.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()));
        }
        if (searchBarcode.trim() !== '') {
            filteredData = filteredData.filter(item => item.bar_code.toLowerCase().includes(searchBarcode.toLowerCase()));
        }
        if (searchSku.trim() !== '') {
            filteredData = filteredData.filter(item => item.sku.toLowerCase().includes(searchSku.toLowerCase()));
        }
        setFilteredData(filteredData);
    }, [searchID, searchName, searchSku, searchBarcode, data]);

    const fetchData = (pageNum) => {
        let parameters = '';
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        const url = `https://api2.ebazaar.mn/api/products/get1?${parameters}page=${page.current}&limit=100&order_by=created_desc`;
        fetch(url, requestOptions)
            .then((r) => r.json())
            .then((response) => {
                if (response.data.length > 0) {
                    fetchedProducts.current = [...fetchedProducts.current, ...response.data];
                    setData(fetchedProducts.current);
                    fetchingData.current = false;
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    filteredData.map((product) => {
        let manufacturer = null;
        let category = null;
        let createdBy = null;

        if (parseInt(product.manufacturer) > 0 && props.attributes.manufacturer) {
            for (const [key, value] of Object.entries(props.attributes.manufacturer)) {
                if (key === product.manufacturer) {
                    manufacturer = value;
                    break;
                }
            }
        }
        if (parseInt(product.category_id) > 0) {
            props.productGroups.map((prodgroup) => {
                if (parseInt(prodgroup.ID) === parseInt(product.category_id)) {
                    category = prodgroup.Name;
                }
                return null;
            });
        }
        if (parseInt(product.created_by) > 0) {
            props.supplierUsers.map((user) => {
                createdBy = user.first_name + ' ' + user.last_name;
                return null;
            });
        }
        renderHTML.push(
            <div className="listEntry" style={{ width: props.totalWidth + 'px' }} key={product._id}>
                <div className="entryBlock" style={{ width: widths[0] }}>
                    <input type="checkbox" data-id={product._id} className="customerToggle" />
                </div>
                <div className="entryBlock" style={{ width: widths[1] }} onClick={() => props.setProduct(product)}>
                    <p style={{ color: '#0969DA', cursor: 'pointer' }}>{product._id}</p>
                </div>
                <div className="entryBlock" style={{ width: '60px' }}>
                    <label className="switch_product">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="entryBlock" style={{ width: widths[3] }}>
                    <img src={product.image && product.image[0] ? product.image[0].replace('original', 'small') : null} style={{ width: '30px', height: '30px', objectFit: 'contain' }} alt="" />
                </div>
                <div className="entryBlock" style={{ width: '120px' }}>
                    <p>{product.name}</p>
                </div>
                <div className="entryBlock" style={{ width: '120px' }}>
                    <p>{product.brand}</p>
                </div>
                <div className="entryBlock" style={{ width: '120px' }}>
                    <p>{product.category}</p>
                </div>
                <div className="entryBlock" style={{ width: widths[9] }}>
                    <p>{product.description}</p>
                </div>
                <div className="entryBlock" style={{ width: '120px' }}>
                    <p>{product.bar_code}</p>
                </div>
                <div className="entryBlock" style={{ width: '110px' }}>
                    <p>{product.sku}</p>
                </div>
                <div className="entryBlock" style={{ width: '110px' }}>
                    <p>{product.price}</p>
                </div>
                <div className="entryBlock" style={{ width: widths[4] }}>
                    <p>{manufacturer}</p>
                </div>
                <div className="entryBlock" style={{ width: widths[8], marginLeft: '6px' }}>
                    <p>{product.created_date.substr(0, 10)}</p>
                </div>
            </div>
        );
    });

    const nextPage = 'nextpage';
    renderHTML.push(<div id={nextPage} key={nextPage}></div>);

    useEffect(() => {
        attachEvent();
    }, []);

    const attachEvent = () => {
        document.getElementById('pageList').addEventListener('scroll', () => {
            if (isInViewport(nextPage)) {
                if (fetchingData.current === false) {
                    fetchingData.current = true;
                    pageIncrement();
                }
            }
        });
    };

    function isInViewport(page) {
        const rect = document.getElementById(page).getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const pageIncrement = () => {
        page.current = parseInt(page.current) + 1;
        fetchData();
    };

    return (
        <div id="pageList">
            <div className="listEntry" id="listHeader" style={{ minWidth: props.totalWidth + 'px' }}>
                <div className="entryBlock" style={{ width: widths[0], justifyContent: 'center' }}>
                    <input type="checkbox" />
                </div>
                <div className="entryBlock" style={{ width: widths[1] }}>
                    <div className="entryHeader">
                        <label>Дугаар</label>
                        <input
                            type="text"
                            value={searchID}
                            onChange={(e) => setSearchID(e.target.value)}
                        />
                    </div>
                </div>
                <div className="entryBlock" style={{ width: '60px' }}>
                    <div className="entryHeader">
                        <label>Идэвхтэй</label>
                        <input type="text" disabled />
                    </div>
                </div>
                <div className="entryBlock" style={{ width: widths[3] }}>
                    <div className="entryHeader">
                        <label>Зураг</label>
                        <input type="text" disabled />
                    </div>
                </div>
                <div className="entryBlock" style={{ width: '120px' }}>
                    <div className="entryHeader">
                        <label>Нэр</label>
                        <input
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="entryBlock" style={{ width: '120px' }}>
                    <div className="entryHeader">
                        <label>Брэнд</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="entryBlock" style={{ width: '120px' }}>
                    <div className="entryHeader">
                        <label>Ангилал</label>
                        <select>
                            <option value="all">Бүгд</option>
                        </select>
                    </div>
                </div>
                <div className="entryBlock" style={{ width: widths[4] }}>
                    <div className="entryHeader">
                        <label>Тайлбар</label>
                        <input type="text" disabled />
                    </div>
                </div>
                <div className="entryBlock" style={{ width: '110px' }}>
                    <div className="entryHeader">
                        <label>Баркод</label>
                        <input type="text" onChange={(e) => setSearchBarcode(e.target.value)}/>
                    </div>
                </div>
                <div className="entryBlock" style={{ width: '125px' }}>
                    <div className="entryHeader">
                        <label>SKU</label>
                        <input type="text" onChange={(e) => setSearchSku(e.target.value)}/>
                    </div>
                </div>
                <div className="entryBlock" style={{ width: '110px' }}>
                    <div className="entryHeader">
                        <label>Price</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="entryBlock" style={{ width: widths[4] }}>
                    <div className="entryHeader">
                        <label>Үйлдвэрлэгч</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="entryBlock" style={{ width: '100px' }}>
                    <div className="entryHeader">
                        <label>Үүсгэсэн огноо</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="entryBlock" style={{ width: '100px' }}>
                    <div className="entryHeader">
                        <label>Агуулах</label>
                        <input type="text" disabled/>
                </div>
                </div>
            </div>
            {renderHTML}
        </div>
    );
};

export default List;

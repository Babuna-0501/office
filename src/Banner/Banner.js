import React, { useState, useEffect, useContext } from 'react';
import Setting from '../assets/Setting.svg';
import plus from '../assets/plus button.svg';
import Delete from '../assets/delete_big.svg';
import { Drawer } from 'antd';
import css from './list.module.css';
import { Select, Popconfirm } from 'antd';
import BackOfficeHook from '../Hooks/BackOfficeHook';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const Banner = props => {
  const [data, setData] = useState();

  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState();
  const [bannerType, setBannerType] = useState();
  const [id, setId] = useState();
  const [productInput, setProductInput] = useState();
  const [productSearch, setProductSearch] = useState([]);
  const [deviceType, setDeviceType] = useState();
  const [img, setImg] = useState();
  const [index, setIndex] = useState();
  const [dummy, setDummy] = useState(0);
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);
  const mobiledragItem = React.useRef(null);
  const mobiledragOverItem = React.useRef(null);

  const bannerctx = useContext(BackOfficeHook);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let _fruitItems = [...data.desktop];

    //remove and save the dragged item content
    const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0];

    //switch the position
    _fruitItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    // data?.desktop;
    let aa = data;

    aa['desktop'] = _fruitItems;

    // setData(aa)
    setData(aa);

    bannerctx.setNewBanner(_fruitItems);
  };

  //const handle drag sorting
  const mobileHandleSort = () => {
    //duplicate items
    let _fruitItems = [...data.mobile];

    //remove and save the dragged item content
    const draggedItemContent = _fruitItems.splice(mobiledragItem.current, 1)[0];

    //switch the position
    _fruitItems.splice(mobiledragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    mobiledragItem.current = null;
    mobiledragOverItem.current = null;

    let aa = data;

    aa['mobile'] = _fruitItems;

    //update the actual array
    setData(aa);

    bannerctx.setMobileBanner(_fruitItems);
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL}/api/pages/?page_id=1`;

    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        // console.log("res banner", res);
        setData(res.data.find(a => a.type === 'Banner').new_data.image);
        // console.log("data", data);
        bannerctx.setMobileBanner(
          res.data.find(a => a.type === 'Banner').new_data.image.mobile
        );
        bannerctx.setNewBanner(
          res.data.find(a => a.type === 'Banner').new_data.image.desktop
        );
      })
      .catch(error => {
        alert('Алдаа гарлаа');
      });
  }, [dummy]);

  useEffect(() => {
    if (productInput?.length > 1) {
      var myHeaders = new Headers();
      myHeaders.append(
        'ebazaar_token',
        localStorage.getItem('ebazaar_admin_token')
      );
      myHeaders.append('Content-Type', 'application/json');
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let url = `${process.env.REACT_APP_API_URL2}/api/products/get1?search=${productInput}`;

      fetch(url, requestOptions)
        .then(r => r.json())
        .then(res => {
          setProductSearch(res.data);
        })
        .catch(error => {
          alert('Алдаа гарлаа');
        });
    }
  }, [productInput]);

  const up = () => {
    const id = (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
    document
      .getElementById('root')
      .insertAdjacentHTML(
        'beforeEnd',
        '<form method="post" enctype="multipart/form‐data" id="' +
          id +
          '" name=' +
          id +
          '><input type="file" id="uploader' +
          id +
          '" multiple /></form>'
      );
    document.getElementById('uploader' + id).click();
    document
      .getElementById('uploader' + id)
      .addEventListener('change', () => upload(id), false);
  };
  const upload = form => {
    const uploader = document.getElementById('uploader' + form);
    var fileField = document.getElementById('uploader' + form);
    let formData = new FormData();
    for (let i = 0; i < uploader.files.length; i++) {
      formData.append('files', fileField.files[i]);
    }
    fetch(
      `${process.env.REACT_APP_MEDIA_UPLOAD_URL}?preset=product&ebazaar_admin_token=` +
        localStorage.getItem('ebazaar_admin_token'),
      { method: 'post', body: formData }
    )
      .then(r => r.json())
      .then(response => {
        let temp = [];
        if (response.status === 200) {
          response.data.map(img => {
            temp.push(
              `${process.env.REACT_APP_MEDIA_URL}/original/` + img.image
            );
          });
        }
        setImg(temp[0]);
      });
  };

  const save = () => {
    if (img) {
      if (deviceType) {
        var myHeaders = new Headers();
        myHeaders.append(
          'ebazaar_token',
          localStorage.getItem('ebazaar_admin_token')
        );
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            bannerType: deviceType,
            index: selected === 'new' ? data[deviceType].length : index,
            file: img,
            type: parseInt(bannerType),
            id: parseInt(id)
          }),
          redirect: 'follow'
        };
        // console.log("requestOptions banner", requestOptions);
        let url = `${process.env.REACT_APP_API_URL2}/api/updateBanner`;
        fetch(url, requestOptions)
          .then(r => r.json())
          .then(result => {
            if (result.code === 200) {
              alert('Амжилттай хадгаллаа!');
              setEdit(false);
              setDummy(dummy + 1);
              // props.setProduct({
              // 	...props.product,
              // 	image: images,
              // });
            } else {
              alert('Алдаа гарлаа!');
            }
          })
          .catch(error => {
            alert('Алдаа гарлаа');
          });
      } else {
        alert('Төхөөрөмжөө сонго л доо!');
      }
    } else {
      alert('Зурагаа оруулал даа!');
    }
  };
  const del = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        bannerType: deviceType,
        index: index
      }),
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/removeBanner`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(result => {
        if (result.code === 200) {
          alert('Амжилттай устгалаа!');
          setEdit(false);
          setDummy(dummy + 1);
        } else {
          alert('Алдаа гарлаа!');
        }
      })
      .catch(error => {
        alert('Алдаа гарлаа');
      });
  };
  const footer = () => {
    return (
      <div>
        <div className={css.confirmContainer}>
          <span
            className={css.cancel}
            onClick={() => {
              setEdit(false);
            }}
          >
            Цуцлах
          </span>
          <span
            className={css.save}
            onClick={() => {
              save();
            }}
          >
            Хадгалах
          </span>
        </div>
      </div>
    );
  };

  const handleChange = value => {
    setProductInput(value);
  };

  return (
    <div className={css.ccontainer}>
      <div className={css.dcontainer}>
        <div className={css.title}>
          Веб
          <img
            src={plus}
            alt=''
            onClick={() => {
              setEdit(true);
              setSelected('new');
              setImg();
            }}
          />
        </div>
        <div className={css.econtainer}>
          {data?.desktop?.map((x, i) => (
            <div
              className={css.fcontainer}
              key={i}
              draggable
              onDragStart={e => (dragItem.current = i)}
              onDragEnter={e => (dragOverItem.current = i)}
              onDragEnd={handleSort}
              onDragOver={e => e.preventDefault()}
            >
              <img
                src={x.file.replace('original', 'product')}
                alt=''
                width={285}
              />
              <div className={css.gcontainer}>
                <div className={css.name}>
                  {x.type === 1
                    ? props?.suppliers?.find(e => e.id === x.id)?.name
                    : ''}
                </div>
                <div>
                  {x.type === 1
                    ? 'Нийлүүлэгч'
                    : x.type === 2
                    ? 'Бүтээгдхүүн'
                    : x.type === 3
                    ? 'Брэнд'
                    : x.type === 0
                    ? 'Banner'
                    : ''}
                </div>
                <img
                  src={Setting}
                  alt=''
                  className={css.setting}
                  onClick={() => {
                    setEdit(true);
                    setSelected(x.file);
                    setDeviceType('desktop');
                    setImg(x.file);
                    setIndex(i);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={css.dcontainer}>
        <div className={css.title}>
          Мобайл
          <img
            src={plus}
            alt=''
            onClick={() => {
              setEdit(true);
              setSelected('new');
              setImg();
            }}
          />
        </div>
        <div className={css.econtainer}>
          {data?.mobile?.map((x, i) => (
            <div
              className={css.fcontainer}
              key={i}
              draggable
              onDragStart={e => (mobiledragItem.current = i)}
              onDragEnter={e => (mobiledragOverItem.current = i)}
              onDragEnd={mobileHandleSort}
              onDragOver={e => e.preventDefault()}
            >
              <img
                src={x.file.replace('original', 'product')}
                alt=''
                width={285}
              />
              <div className={css.gcontainer}>
                <div className={css.name}>
                  {x.type === 1
                    ? props?.suppliers?.find(e => e.id === x.id)?.name
                    : ''}
                </div>
                <div>
                  {x.type === 1
                    ? 'Нийлүүлэгч'
                    : x.type === 2
                    ? 'Бүтээгдхүүн'
                    : x.type === 3
                    ? 'Брэнд'
                    : ''}
                </div>
                <img
                  src={Setting}
                  alt=''
                  className={css.setting}
                  onClick={() => {
                    setEdit(true);
                    setSelected(x.file);
                    setDeviceType('mobile');
                    setImg(x.file);
                    setIndex(i);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Drawer
        title={<div className={css.drawerTitle}>Баннер</div>}
        placement='right'
        onClose={() => setEdit(false)}
        open={edit}
        width='571px'
        footer={footer()}
        bodyStyle={{ background: '#f6f7f8' }}
      >
        <div>
          <img src={img} style={{ width: '100%' }} />
          <div className={css.title}>
            <img
              src='https://ebazaar.mn/icon/photo-add.svg'
              onClick={() => up()}
              alt=''
              style={{ height: '80px', width: '80px' }}
            />
            {selected !== 'new' && (
              <Popconfirm
                placement='right'
                title='Та устгахдаа итгэлтэй байна уу?'
                onConfirm={() => del()}
                okText='Тийм'
                cancelText='Үгүй'
              >
                <img
                  src={Delete}
                  alt=''
                  height={40}
                  style={{ cursor: 'pointer' }}
                />
              </Popconfirm>
            )}
          </div>
          <div className={css.deviceBanner}>
            <span className={css.deviceTohooromj}>Төхөөрөмж:</span>
            <select
              onChange={e => {
                setDeviceType(e.target.value);
              }}
            >
              <option value={''}>---</option>
              <option value={'desktop'}>Desktop</option>
              <option value={'mobile'}>Mobile</option>
            </select>
          </div>
          <div className={css.deviceBanner}>
            <span className={css.deviceTohooromj}> Төрөл:</span>
            <select
              onChange={e => {
                setBannerType(e.target.value);
              }}
            >
              <option value={''}>---</option>
              <option value={1}>Нийлүүлэгч</option>
              <option value={2}>Бүтээгдхүүн</option>
              <option value={3}>Брэнд</option>
            </select>
          </div>
          {bannerType && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span className={css.deviceTohooromj}> Нэр:</span>
              {bannerType === '1' ? (
                <select
                  onChange={e => {
                    setId(e.target.value);
                  }}
                >
                  <option value={''}>---</option>
                  {props.suppliers.map(e => (
                    <option value={e.id} key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              ) : bannerType === '2' ? (
                <Select
                  showSearch
                  style={{
                    width: 300
                  }}
                  placeholder='Хайх'
                  onSearch={handleChange}
                  onChange={e => setId(e)}
                  filterOption={(input, option) => option?.name}
                  options={productSearch}
                  fieldNames={{ label: 'name', value: '_id' }}
                />
              ) : bannerType === '3' ? (
                <select
                  onChange={e => {
                    setId(e.target.value);
                  }}
                >
                  <option value={''}>---</option>
                  {props.brands.map(e => (
                    <option value={e.BrandID} key={e.BrandID}>
                      {e.BrandName}
                    </option>
                  ))}
                </select>
              ) : bannerType === '4' ? (
                <select
                  onChange={e => {
                    setId(e.target.value);
                  }}
                >
                  <option value={''}>---</option>
                  {props.brands.map(e => (
                    <option value={e.BrandID} key={e.BrandID}>
                      {e.BrandName}
                    </option>
                  ))}
                </select>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Banner;

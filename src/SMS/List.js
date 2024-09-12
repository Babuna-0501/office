import React, { useState, useEffect, useContext } from 'react';
import Message from './Message';
import css from './list.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const List = props => {
  const [createvalue, setCreatevalue] = useState('');
  const [phonevalue, setPhonevalue] = useState('');
  const [sendervalue, setSendervalue] = useState('');
  const [descvalue, setDescvalue] = useState('');
  const [operatorvalue, setOperatorvalue] = useState('');

  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [save, setSave] = useState(false);
  const [moreData, setMoreData] = useState(true);

  const [page, setPage] = useState(0);

  // console.log("Check sms state: ", createvalue);

  const isInViewport = elem => {
    var bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  let [sms, setSMS] = useState([]);

  console.log('SMS', sms);

  const fetchData = () => {
    setSMS([]);
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    if (dateStart === '' && dateEnd === '') {
      let url = `${process.env.REACT_APP_API_URL2}/api/get/smslog?page=${page}&date=${createvalue}&phone=${phonevalue}&response=${operatorvalue}&content=${descvalue}`;

      fetch(url, requestOptions)
        .then(r => r.json())
        .then(response => {
          if (page === 0) {
            setSMS(response.data);
            console.log('ALL SMS', response.data.length);
          } else {
            setSMS(prevSMS => [...prevSMS, ...response.data]);
            console.log('ELSE SMS', response.data.length);
          }
        })
        .catch(error => console.log('error', error));
    } else {
      let url = `${process.env.REACT_APP_API_URL2}/api/get/smslog?page=${page}&date=${createvalue}&phone=${phonevalue}&response=${operatorvalue}&content=${descvalue}&start_date=${dateStart}&end_date=${dateEnd}`;

      fetch(url, requestOptions)
        .then(r => r.json())
        .then(response => {
          setSMS(response.data);
          setPage('');
          setMoreData(false);
          console.log('FILTERED SMS');
        })
        .catch(error => console.log('error', error));
    }
  };

  useEffect(() => {
    if (phonevalue !== '' || descvalue !== '' || createvalue !== '') {
      setPage('');
    }

    fetchData();
  }, [
    page,
    createvalue,
    phonevalue,
    sendervalue,
    descvalue,
    operatorvalue,
    save
  ]);

  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <div className={css.headerFilter}>
          <div
            className={`${css.headerItem} ${css.width100px} ${css.dateContainer}`}
          >
            <span
              className='header'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpen(!open);
                console.log('DatePicker');
              }}
            >
              Огноо
            </span>
            {!open ? (
              <></>
            ) : (
              <div className={css.datePicker}>
                <div className={css.dateClose} onClick={() => setOpen(!open)}>
                  Хаах
                </div>
                <div
                  className={css.dateSave}
                  onClick={() => {
                    setOpen(!open);
                    setSave(true);
                  }}
                >
                  Хадгалах
                </div>

                <div className={css.dateItem}>
                  <span>Эхлэх огноо</span>
                  <input
                    type='date'
                    defaultValue={dateStart}
                    onChange={e => setDateStart(e.target.value)}
                  />
                </div>
                <div className={css.dateItem}>
                  <span>Дуусах огноо</span>
                  <input
                    type='date'
                    defaultValue={dateEnd}
                    onChange={e => setDateEnd(e.target.value)}
                  />
                </div>
              </div>
            )}
            <input
              type='date'
              placeholder='Хайх'
              defaultValue={createvalue}
              onChange={e => setCreatevalue(e.target.value)}
            />
          </div>
          <div className={`${css.headerItem} ${css.width100px}`}>
            <span className='header'>Дугаар</span>
            <input
              type='number'
              placeholder='Хайх'
              onChange={e => {
                if (e.target.value === '') {
                  setPhonevalue('');
                }
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setPhonevalue(e.target.value);
                }
              }}
            />
          </div>
          <div className={`${css.headerItem} ${css.width200px}`}>
            <span className='header'>Илгээгч</span>
            <input
              type='text'
              placeholder='Хайх'
              value={sendervalue}
              onChange={e => setSendervalue(e.target.value)}
            />
          </div>
          <div className={`${css.headerItem} ${css.width400px}`}>
            <span className='header'>Утга</span>
            <input
              type='text'
              placeholder='Хайх'
              onChange={e => {
                if (e.target.value === '') {
                  setDescvalue('');
                  setPage(1);
                }
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setDescvalue(e.target.value);
                }
              }}
            />
          </div>
          <div className={`${css.headerItem} ${css.width400px}`}>
            <span className='header'>Oператорын хариу</span>
            <select
              name='response'
              onChange={e => setOperatorvalue(e.target.value)}
            >
              <option selected value=''>
                Бүгд
              </option>
              <option value='SUCCESS'>Success</option>
              <option value='OK'>Ok</option>
              <option value='Sent'>Sent</option>
              <option value='accepted'>Accepted</option>
            </select>
            {/* <input
							type="text"
							placeholder="Хайх"
							value={operatorvalue}
							onChange={e => setOperatorvalue(e.target.value)}
						/> */}
          </div>
        </div>
        <div className={css.pageSetup}>
          <div className={css.page}>
            <span>Хуудас</span>
            <div>{page + 1}</div>
          </div>
        </div>
      </div>

      <div className={css.list} id='scrollContainer'>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          scrollableTarget='scrollContainer'
          dataLength={sms.length}
          hasMore={moreData}
          next={() => {
            // if (
            // 	createvalue !== "" ||
            // 	phonevalue !== "" ||
            // 	sendervalue !== "" ||
            // 	descvalue !== "" ||
            // 	operatorvalue !== ""
            // ) {
            // 	setPage(1);
            // } else if (
            // 	createvalue === "" &&
            // 	phonevalue === "" &&
            // 	sendervalue === "" &&
            // 	descvalue === "" &&
            // 	operatorvalue === ""
            // ) {
            setPage(prev => prev + 1);
            // }
          }}
          loader={
            <p style={{ textAlign: 'center' }}>
              <b>Уншиж байна...</b>
            </p>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Бүх мэдээлэл</b>
            </p>
          }
        >
          {sms.map((message, index) => {
            return <Message message={message} key={index} />;
          })}
        </InfiniteScroll>
      </div>
      {/* <div id="blahblah"></div> */}
    </div>
  );
};

export default List;

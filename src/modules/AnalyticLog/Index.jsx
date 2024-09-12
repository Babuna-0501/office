// CSS
import css from './index.module.css';

import { useContext, useEffect } from 'react';
import { HeaderContext } from '../../Hooks/HeaderHook';

import { LogHeader } from './components/LogHeader';
import {
  Checkbox,
  Dropdown,
  Input,
  LoadingSpinner
} from '../../components/common';

import calendarIcon from '../../assets/global/calendar.svg';
import { GlobalContext } from '../../Hooks/GlobalContext';
import { useState } from 'react';
import ErrorPopup from '../../components/common/ErrorPopup';
import myHeaders from '../../components/MyHeader/myHeader';
import InfiniteScroll from 'react-infinite-scroll-component';

const Index = () => {
  const { setHeaderContent, setShowRefreshBtn } = useContext(HeaderContext);
  const { businessTypes, globalDataReady } = useContext(GlobalContext);

  const [logs, setLogs] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const [logDate, setLogDate] = useState('');

  useEffect(() => {
    setHeaderContent(<LogHeader />);
    setShowRefreshBtn(true);

    return () => {
      setHeaderContent(<></>);
      setShowRefreshBtn(false);
    };
  }, [setHeaderContent, setShowRefreshBtn]);

  const getData = async () => {
    try {
      if (currentPage === 1) setLoading(true);

      let logUrl = `${process.env.REACT_APP_API_URL2}/api/analytics?limit=50&page=${currentPage}`;

      if (logDate) {
        logUrl = `${process.env.REACT_APP_API_URL2}/api/analytics?limit=50&page=${currentPage}&date=${logDate}`;
      }

      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const logRes = await fetch(logUrl, requestOptions);
      const logData = await logRes.json();

      if (logData.length === 0) {
        setHasMore(false);
      }

      const tradeshopIds = [
        ...[...new Set(logData.map(log => log.tradeshop_id))]
      ];

      const tradeshopsUrl = `${
        process.env.REACT_API_URL2
      }/api/merchants?id=${tradeshopIds.join(',')}`;

      const tradeshopsRes = await fetch(tradeshopsUrl, requestOptions);
      const tradeshopsData = await tradeshopsRes.json();

      if (logDate) {
        setLogs(
          logData.map(log => {
            const curTradeshop = tradeshopsData.data?.find(
              tradeshop => tradeshop.tradeshop_id === log.tradeshop_id
            );
            if (curTradeshop) {
              return { ...log, tradeshop: { ...curTradeshop } };
            }

            return log;
          })
        );
      } else {
        setLogs(prev => [
          ...prev,
          ...logData.map(log => {
            const curTradeshop = tradeshopsData.data?.find(
              tradeshop => tradeshop.tradeshop_id === log.tradeshop_id
            );
            if (curTradeshop) {
              return { ...log, tradeshop: { ...curTradeshop } };
            }

            return log;
          })
        ]);
      }
    } catch (error) {
      setErrorMsg('Алдаа гарлаа. Та дахин оролдоно уу!');
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (globalDataReady) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalDataReady, currentPage, logDate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [logDate]);

  return (
    <>
      <div className={css.container}>
        <div className={css.header} style={{ zIndex: logs.length + 1 }}>
          <div
            className={css.headerItem}
            style={{
              width: 34,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Checkbox
              checked={
                logs
                  .map(log => log._id)
                  .sort()
                  .join(',') ===
                selectedLogs
                  .map(log => log._id)
                  .sort()
                  .join(',')
              }
              onChange={() => {
                if (
                  logs
                    .map(log => log._id)
                    .sort()
                    .join(',') ===
                  selectedLogs
                    .map(log => log._id)
                    .sort()
                    .join(',')
                ) {
                  setSelectedLogs([]);
                } else {
                  setSelectedLogs([...logs]);
                }
              }}
            />
          </div>

          <div className={css.headerItem} style={{ width: 200 }}>
            <span className={css.headerText}>Лог огноо</span>
            <Input
              value={logDate}
              onChange={e => setLogDate(e.target.value)}
              size='small'
              type='date'
              icon={calendarIcon}
              iconposition='left'
              name='logDate'
            />
          </div>

          <div className={css.headerItem} style={{ width: 150 }}>
            <span className={css.headerText}>Компанийн нэр</span>
            <Input size='small' placeholder='Хайх' />
          </div>

          <div className={css.headerItem} style={{ width: 150 }}>
            <span className={css.headerText}>Регистер</span>
            <Input size='small' placeholder='Хайх' />
          </div>

          <div className={css.headerItem} style={{ width: 150 }}>
            <span className={css.headerText}>Суваг</span>
            <Dropdown />
          </div>

          <div className={css.headerItem} style={{ width: 150 }}>
            <span className={css.headerText}>Үйл ажилгааны чиглэл</span>
            <Dropdown />
          </div>

          <div className={css.headerItem} style={{ width: 150 }}>
            <span className={css.headerText}>Нэр</span>
            <Input size='small' placeholder='Хайх' />
          </div>

          <div className={css.headerItem} style={{ width: 150 }}>
            <span className={css.headerText}>Section</span>
            <Input size='small' placeholder='Хайх' />
          </div>

          <div className={css.headerItem} style={{ width: 150 }}>
            <span className={css.headerText}>Утга</span>
            <Input size='small' placeholder='Хайх' />
          </div>
        </div>

        {!loading && logs.length > 0 && (
          <div className={css.content} id='logScrollDiv'>
            <InfiniteScroll
              scrollableTarget='logScrollDiv'
              hasMore={hasMore}
              dataLength={logs.length}
              next={() => setCurrentPage(prev => prev + 1)}
              loader={<h4 className={css.loadingScroll}>Уншиж байна...</h4>}
            >
              {logs.map((log, index) => {
                return (
                  <SingleLog
                    key={`analytic-log-${log._id}`}
                    zIndex={logs.length - index}
                    log={log}
                    businessTypes={businessTypes}
                    selectedLogs={selectedLogs}
                    setSelectedLogs={setSelectedLogs}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
        )}

        {loading && (
          <div className={css.spinner}>
            <LoadingSpinner />
          </div>
        )}

        {!loading && logs.length === 0 && (
          <div className={css.notFound}>
            <span>Илэрц олдсонгүй</span>
          </div>
        )}
      </div>

      <ErrorPopup
        show={showErrorMsg}
        message={errorMsg}
        closeHandler={() => {
          setShowErrorMsg(false);
          setErrorMsg('');
          getData();
        }}
      />
    </>
  );
};

export default Index;

const SingleLog = ({
  zIndex,
  log,
  businessTypes,
  selectedLogs,
  setSelectedLogs
}) => {
  const checked = selectedLogs.map(curLog => curLog._id).includes(log._id);

  return (
    <div
      className={`${css.contentRow} ${checked && css.checked}`}
      style={{ zIndex }}
    >
      <div
        className={css.contentItem}
        style={{ width: 34, justifyContent: 'center' }}
      >
        <Checkbox
          checked={checked}
          onChange={() => {
            if (checked) {
              setSelectedLogs(prev =>
                prev.filter(curLog => curLog._id !== log._id)
              );
            } else {
              setSelectedLogs(prev => [...prev, log]);
            }
          }}
        />
      </div>

      <div className={css.contentItem} style={{ width: 200 }}>
        <span className={css.contentText}>{log.created_date}</span>
      </div>

      <div className={css.contentItem} style={{ width: 150 }}>
        <span className={css.contentText}>
          {log.tradeshop?.tradeshop_name ?? ''}
        </span>
      </div>

      <div className={css.contentItem} style={{ width: 150 }}>
        <span className={css.contentText}>
          {log.tradeshop?.business_register ?? ''}
        </span>
      </div>

      <div className={css.contentItem} style={{ width: 150 }}>
        <span className={css.contentText}>
          {
            businessTypes.find(
              type =>
                type.business_type_id ===
                Number(log.tradeshop?.business_type_id)
            )?.business_type_name
          }
        </span>
      </div>

      <div className={css.contentItem} style={{ width: 150 }}>
        <span className={css.contentText}>
          {
            businessTypes.find(
              type =>
                type.business_type_id ===
                Number(log.tradeshop?.business_type_id)
            )?.channel_name
          }
        </span>
      </div>

      <div className={css.contentItem} style={{ width: 150 }}>
        <span className={css.contentText}>
          {log.tradeshop?.customer_name ?? ''}
        </span>
      </div>

      <div className={css.contentItem} style={{ width: 150 }}>
        <span className={css.contentText}>{log.section}</span>
      </div>

      <div className={css.contentItem} style={{ width: 150 }}>
        <span className={css.contentText}>{log.name ?? ''}</span>
      </div>
    </div>
  );
};

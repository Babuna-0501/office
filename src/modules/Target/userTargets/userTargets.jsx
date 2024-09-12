import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';
import { HeaderContext } from '../../../Hooks/HeaderHook';
import Link from '../../../components/Routing/Link';
import css from './userTargets.module.css';
import HeaderContent from './headerContent';
import { Button } from '../../../components/common';
import { ProfileGray } from '../../../assets/icons';

const UserTargets = () => {
  const { setHeaderContent } = useContext(HeaderContext);
  const [userId] = useState(window.location.pathname.split('/')[2]);

  const [userData, setUserData] = useState({ first_name: 'Нэргүй', role: 0 });
  const [targets, setTargets] = useState([]);
  const [succeededPerc, setSuceededPerc] = useState(0);
  const [waitingPerc, setWaitingPerc] = useState(0);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const amountTargetCalculator = () => {
    let goal = 0;
    let succeeded = 0;
    let waiting = 0;

    targets.map(target => {
      if (target?.type === 2) {
        goal += target.target.goal;
        succeeded += target.target.succeeded;
        waiting += target.target.waiting;
      } else if (target?.type === 1) {
        target?.products?.length &&
          target.products.map(product => {
            goal += product.target.amount;
            succeeded += product.succeeded.amount;
            waiting += product.waiting.amount;
          });
        target?.categories?.length &&
          target.categories.map(category => {
            goal += category.target.amount;
            succeeded += category.succeeded.amount;
            waiting += category.waiting.amount;
          });
        target?.brands?.length &&
          target.brands.map(brand => {
            goal += brand.target.amount;
            succeeded += brand.succeeded.amount;
            waiting += brand.waiting.amount;
          });
      }
    });

    setWaitingPerc(Math.round((waiting / goal) * 100) || 0);
    setSuceededPerc(Math.round((succeeded / goal) * 100) || 0);
  };
  useEffect(() => {
    targets.length > 0 && amountTargetCalculator();
  }, [targets]);

  const targetCalculator = ({ target }) => {
    let returnValue = {
      goal: 0,
      succeeded: 0,
      waiting: 0
    };

    if (target?.type === 2) {
      returnValue = target.target;
    } else if (target?.type === 1) {
      target?.products &&
        target.products.map(product => {
          returnValue.goal += product.target.amount;
          returnValue.succeeded += product.succeeded.amount;
          returnValue.waiting += product.waiting.amount;
        });
      target?.categories &&
        target.categories.map(category => {
          returnValue.goal += category.target.amount;
          returnValue.succeeded += category.succeeded.amount;
          returnValue.waiting += category.waiting.amount;
        });
      target?.brands &&
        target.brands.map(brand => {
          returnValue.goal += brand.target.amount;
          returnValue.succeeded += brand.succeeded.amount;
          returnValue.waiting += brand.waiting.amount;
        });
    }
    return returnValue;
  };

  const getTargetByUser = async () => {
    try {
      let url = `https://api2.ebazaar.link/api/backoffice/users/targets?userId=${userId}`;
      if (startDate && endDate) {
        url = `https://api2.ebazaar.link/api/backoffice/users/targets?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
      }

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      console.log(resData.data);

      setTargets(resData.data);
    } catch (error) {
      console.log(error);
      alert('Алдаа', error);
    }
  };

  const getUser = async () => {
    try {
      const url = `https://api2.ebazaar.link/api/backoffice/users?id=${userId}`;

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      setUserData(resData.data?.[0]);
    } catch (error) {
      console.log(error);
      alert('Алдаа', error);
    }
  };

  useEffect(() => {
    getTargetByUser();
    getUser();
  }, [userId]);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);
  }, []);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.userInfo}>
          <div className={css.userProfile}>
            {userData.profile_picture ? (
              <img
                src={userData.profile_picture}
                alt='profile'
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <ProfileGray />
            )}
          </div>
          <div className={css.userNameRole}>
            <span style={{ fontWeight: '700' }}>{userData.first_name}</span>
            <span>
              {userData.role === 0 && ' '}
              {userData.role === 1 && 'Худалдааны төлөөлөгч'}
              {userData.role === 2 && 'Түгээгч'}
              {userData.role === 3 && 'Админ'}
              {userData.role === 4 && 'Van Sale'}
              {userData.role === 5 && 'Нярав'}
            </span>
          </div>
        </div>
        <div className={css.dateFilter}>
          <input
            type='date'
            onChange={e => {
              setStartDate(e.target.value);
            }}
          />
          <img
            src='/static/media/arrow-right.99b8a05c36a6a1040bc241e82526c995.svg'
            alt='arrow'
            style={{ height: '50%' }}
          />
          <input
            type='date'
            onChange={e => {
              setEndDate(e.target.value);
            }}
          />
          <Button onClick={getTargetByUser}>Харах</Button>
        </div>
      </div>
      <div className={css.amountTarget}>
        <div
          className={css.targetGraph}
          style={{
            background: `conic-gradient(#2ab674 ${
              3.6 * succeededPerc
            }deg, #d6df2a 0deg)`
          }}
        >
          <div
            className={css.secondGraph}
            style={{
              background: `conic-gradient(transparent ${
                (succeededPerc + waitingPerc) * 3.6
              }deg, #F1F1F1   0deg)`
            }}
          ></div>

          <div className={css.graphValues}>
            <span className={css.completed}>{succeededPerc}%</span>
            <span className={css.pending}>{waitingPerc}%</span>
          </div>
        </div>
      </div>

      <div className={css.targetsList}>
        <div className={css.oneTargetHeader}>
          <span>№</span>
          <span>Эхлэх огноо</span>
          <span>Дуусах огноо</span>
          <span>Төлөвлөгөө</span>
          <span>Биелэлт</span>
          <span>Хүлээгдэж буй</span>
          <span></span>
        </div>
        {targets.map((target, index) => {
          const value = targetCalculator({ target });
          const succeededPercentage =
            value.succeeded > 0
              ? Math.round((value.succeeded / value.goal) * 100)
              : 0;
          const waitingPercentage =
            value.waiting > 0
              ? Math.round((value.waiting / value.goal) * 100)
              : 0;

          return (
            true && (
              <Link href={`/target/${target._id}`} key={target._id}>
                <div className={css.oneTarget} key={target._id}>
                  <span>{index + 1}</span>
                  <span>{target.startDate}</span>
                  <span>{target.endDate}</span>
                  <span>{value.goal.toLocaleString()}</span>
                  <span>{value.succeeded.toLocaleString()}</span>
                  <span>{value.waiting.toLocaleString()}</span>
                  <div
                    className={css.targetGraph}
                    style={{
                      width: '80px',
                      height: '80px',
                      background: `conic-gradient(#2ab674 ${
                        3.6 * succeededPercentage
                      }deg, #d6df2a 0deg)`
                    }}
                  >
                    <div
                      className={css.secondGraph2}
                      style={{
                        background: `conic-gradient(transparent ${
                          (waitingPercentage + succeededPercentage) * 3.6
                        }deg, #F1F1F1   0deg)`
                      }}
                    ></div>

                    <div className={css.graphValues}>
                      <span
                        className={css.completed}
                        style={{
                          width: 'max-content',
                          backgroundColor: 'transparent',
                          fontSize: '13px'
                        }}
                      >
                        {succeededPercentage}%
                      </span>
                      <span
                        className={css.pending}
                        style={{
                          width: 'max-content',
                          backgroundColor: 'transparent',
                          fontSize: '12px'
                        }}
                      >
                        {waitingPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default UserTargets;

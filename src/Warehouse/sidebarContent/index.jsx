import React, { useEffect, useState } from 'react';
import css from './index.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { replaceImageUrl } from '../../utils';

export const SidebarContent = ({
  product,
  movementData,
  movementArr,
  setPage,
  page
}) => {
  const [movementArrCopy, setMovementArrCopy] = useState(movementArr);

  const filterAll = () => {
    setMovementArrCopy(movementArr);
  };
  const filterIn = () => {
    const filteredData = movementArr.filter(a => a.type === 1);
    setMovementArrCopy(filteredData);
  };
  const filterOut = () => {
    const filteredData = movementArr.filter(a => a.type === 2);
    setMovementArrCopy(filteredData);
  };

  useEffect(() => {
    setMovementArrCopy(movementArr);
  }, [movementArr]);

  return (
    <div className={css.container}>
      <div>Хөдөлгөөн</div>
      <div className={css.productContainer}>
        <div className={css.imgContainer}>
          <img src={replaceImageUrl(product.image[0])} alt='img' />
        </div>
        <div>
          <p>SKU: {product.sku}</p>
          <p>{product.name}</p>
        </div>
      </div>
      <div className={css.movementContainer}>
        <div className={css.movementHeader}>
          <button onClick={filterAll}>Бүгд</button>
          <button onClick={filterIn}>Орсон</button>
          <button onClick={filterOut}>Гарсан</button>
        </div>
      </div>
      <div id='movementBody' className={css.movementBody}>
        <InfiniteScroll
          dataLength={movementArr.length}
          hasMore={true}
          next={() => setPage(prev => prev + 1)}
          loader={
            <p style={{ textAlign: 'center' }}>{/* <b>Уншиж байна...</b> */}</p>
          }
          scrollableTarget='movementBody'
        >
          {movementArrCopy.length > 0 ? (
            movementArrCopy?.map((movement, index) => (
              <div className={css.oneMovement} key={index}>
                <div className={css.oneMovementLeft}>
                  <p>{movement.note}</p>
                  <p style={{ fontWeight: '650' }}>
                    захиалгын дугаар: {movement.documentId}
                  </p>
                  <p>
                    {new Date(movement.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}{' '}
                    {new Date(movement.date).toISOString().substr(11, 8)}
                  </p>{' '}
                </div>
                <div className={css.oneMovementRight}>
                  <p
                    style={
                      movement.type === 1
                        ? { color: '#6cb039', fontWeight: 'bold' }
                        : { color: 'red', fontWeight: 'bold' }
                    }
                  >
                    {movement.type === 1 ? '+' : '-'}
                    {movement.quantity}
                  </p>
                  <p>Үлдэгдэл: {movement.stock}</p>
                </div>
              </div>
            ))
          ) : (
            <div>Хоосон байна</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

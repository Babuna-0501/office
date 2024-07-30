import React, { useEffect, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import CollectionHook from '../Hooks/CollectionHook';
import CollectionModal from './CollectionModal/CollectionModal';
import UpdateCollection from './Update/UpdateCollection';
import myHeaders from '../components/MyHeader/myHeader';
import css from './collection.module.css';
import { HeaderContext } from '../Hooks/HeaderHook';
import { HeaderContent } from './HeaderContent';

const Collection = props => {
  // console.log("collection props", props);
  const collctx = useContext(CollectionHook);
  const [data, setData] = useState([]);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      signal: controller.signal
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/collection/get`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        // console.log("res", res.data);
        setData(res.data);
        controller = null;
      })
      .catch(error => {
        console.log('error', error);
      });
    return () => controller?.abort();
  }, []);
  // const getProducts = () => {
  //   ReactDOM.render(
  //     <React.StrictMode>
  //       <List
  //         data={data}
  //         setUpdate={collctx.setUpdate}
  //         setUpdateProduct={collctx.setUpdateProduct}
  //       />
  //     </React.StrictMode>,
  //     document.getElementById("foobar")
  //   );
  // };
  // useEffect(() => {
  //   getProducts();
  // }, [data]);
  return (
    <div>
      <div
        className='row header'
        style={{ borderBottom: '0.8px solid #cfd8dc' }}
      >
        <div style={{ width: '200px' }}>
          <div>
            <span className='header'>Name</span>
            <input
              type='text'
              //   value={orderID}
              //   onChange={(e) => setOrderID(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: '200px' }}>
          <div>
            <span className='header'>SKUS</span>
            <input
              type='text'
              //   value={searchID}
              //   onChange={(e) => setSearchID(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: '100px' }}>
          <div>
            <span className='header'>Remove</span>
            <input
              type='text'
              //   value={added}
              //   onChange={(e) => setAdded(e.target.value)}
            />
          </div>
        </div>
      </div>
      {collctx.collectionModal && (
        <CollectionModal setData={setData} data={data} />
      )}
      {collctx.update && <UpdateCollection />}
      <div
        id='foobar'
        style={{
          width: '100%',
          overflowX: 'auto',
          overflowy: 'hidden'
        }}
        className={css.body}
      >
        <List
          data={data}
          setUpdate={collctx.setUpdate}
          setUpdateProduct={collctx.setUpdateProduct}
        />
      </div>
    </div>
  );
};

export default Collection;

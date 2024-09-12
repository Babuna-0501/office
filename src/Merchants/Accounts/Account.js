import css from './account.module.css';
import { styles } from './style';
import React, { useState } from 'react';
import AccountEdit from './AccountEdit';
import BusinessTable from './BusinessTable';
import myHeaders from '../../components/MyHeader/myHeader';

const Account = props => {
  let item = props.data;
  const [toggleEdit, setToggleEdit] = useState(false);
  const [data, setData] = useState();
  let businesses = data ? data.businesses : item.businesses;

  const toggleEditModal = e => {
    setToggleEdit(!toggleEdit);
  };

  const getRequest = () => {
    const url = `${process.env.REACT_APP_API_URL2}/users/alldata?page=1&limit=1&userId=${item.userId}`;
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(response => setData(response.data[0]));
  };

  class Modal extends React.Component {
    onClose = e => {
      this.props.onClose && this.props.onClose(e);
    };
    render() {
      if (!this.props.show) {
        return null;
      }
      return (
        <div className={css.modal_overlay}>
          <div className={css.modal}>
            <button onClick={this.onClose} className={css.closeBtn}>
              Close
            </button>
            <div style={{ marginTop: '15px' }}>{this.props.children}</div>
          </div>
        </div>
      );
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <div
        className={css.container}
        style={{
          ...styles.accounts,
          backgroundColor:
            props.index % 2 === 0 ? 'white' : 'rgb(255, 251, 230)',
          borderBottom: '0.8px solid #cfd8dc'
        }}
      >
        <div
          className={css.general}
          style={{ ...styles.nameContainer, fontWeight: '800' }}
          onClick={e => toggleEditModal(e)}
        >
          {data ? data.firstName : item.firstName}
        </div>
        <div className={css.general} onClick={e => toggleEditModal(e)}>
          {data ? data.phone : item.phone},
        </div>
        {/* {data ? data.userId : item.userId}, */}
        <div className={css.general} onClick={e => toggleEditModal(e)}>
          {data ? data.email : item.email}
        </div>
        <Modal onClose={toggleEditModal} show={toggleEdit} class={css.modal}>
          <AccountEdit
            data={data ? data : item}
            setToggleEdit={setToggleEdit}
            toggleEdit={toggleEdit}
            getRequest={getRequest}
          />
        </Modal>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {businesses?.map((business, index) => {
          return (
            <BusinessTable
              key={index}
              business={business}
              suppliers={props.suppliers}
              locations={props.locations}
              businessType={props.businessType}
              toggleEditModal={toggleEditModal}
              setTables={props.setTables}
              userData={props.userData}
              getRequest={getRequest}
              mainIndex={props.index}
              data={props.data}
              sfa={props.sfa}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Account;

import Tugeegch from './components/tugeegch/tugeegch';
import ReportBtn from './components/reportBtn/reportBtn';
import './style.css';

function HeaderContent({
  selectedRows,
  deliveryMans,
  setShowModal,
  showModal
}) {
  return (
    <div className='HeaderContent'>
      <Tugeegch selectedRows={selectedRows} deliveryMans={deliveryMans} />

      <ReportBtn
        selectedRows={selectedRows}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default HeaderContent;

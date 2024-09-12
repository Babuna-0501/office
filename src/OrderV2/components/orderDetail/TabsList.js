import { useState } from 'react';
import NotifTabContent from './NotifTabContent';
import LogTabContent from './LogTabContent';
import NoteTabContent from './NoteTabContent';
import OrderTabContent from './OrderTab/OrderTabContent';

function TabsList({ order, userData }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className='tabs-container'>
      <div className='tabs-header'>
        <div
          className={`tab-item ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Захиалга
        </div>
        <div
          className={`tab-item ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Мэдэгдэл
        </div>
        <div
          className={`tab-item ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => setActiveTab(3)}
        >
          Лог
        </div>
        <div
          className={`tab-item ${activeTab === 4 ? 'active' : ''}`}
          onClick={() => setActiveTab(4)}
        >
          Тэмдэглэл
        </div>
      </div>

      {activeTab === 1 && (
        <OrderTabContent
          products={order.line}
          orderId={order.order_id}
          supplierId={order.supplier_id}
          order={order}
        />
      )}
      {activeTab === 2 && <NotifTabContent />}
      {activeTab === 3 && <LogTabContent />}
      {activeTab === 4 && <NoteTabContent data={order} userData={userData} />}
    </div>
  );
}

export default TabsList;

import { useContext } from 'react';
import { ModuleContext } from './index';
import warehouseData from './type.json';
import css from './style.module.css';

const Warehouses = ({ data }) => {
  const context = useContext(ModuleContext);
  
  const warehouseTypeName = warehouseData.warehouseType[data.type];

  return (
    <div
      className={css.warehouse}
      onClick={() => context.setActiveWarehouse(data)}
    >
      <div className={css.top}>
        <div className="warehouse-img">
          <img src="/images/warehouse.svg" alt="Warehouse" />
        </div>
        <p className="warehouse-name">{data.name}</p>
      </div>
      <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", borderTop:"1px solid #eee", marginTop:"10px" }}>
        <div>
          <small>Агуулахын төрөл:</small>
          <p>{warehouseTypeName.charAt(0).toUpperCase() + warehouseTypeName.slice(1)}</p> 
        </div>
        <div>
          <small>Хариуцсан ажилтан:</small>
          <p>{data.manager}</p>
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Warehouses;

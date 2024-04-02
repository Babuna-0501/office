import { useEffect, useState } from 'react';
import css from './FilterConfig.module.css';
import { Button, Modal, Checkbox } from '../../components/common';
import { CloseDark } from '../../assets/icons';
import OrdersHook from '../../Hooks/OrdersHook';
import { useContext } from 'react';

const FilterConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const ordersCtx = useContext(OrdersHook);
  const { updateUser, fieldsData, setFieldsData } = ordersCtx;

  const [fieldsDataCopy, setFieldsDataCopy] = useState(fieldsData);

  useEffect(() => {
    setFieldsDataCopy(fieldsData);
  }, [fieldsData]);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        variant="secondary"
        size="medium"
      >
        Захиалгын багана сонгох
      </Button>

      <Modal
        show={showModal}
        width={450}
        height={"80vh"}
        closeHandler={() => setShowModal(false)}
      >
        <div className={css.container}>
          <div className={css.header}>
            <h1 className={css.title}>Захиалгын багана сонгох</h1>

            <button
              onClick={() => setShowModal(false)}
              type="button"
              className={css.closeBtn}
            >
              <CloseDark width={40} height={40} />
            </button>
          </div>

          <div className={css.content}>
            {fieldsDataCopy.map((field, index) => {
              if (field.permission === true)
                return (
                  <div className={css.singleField}>
                    <Checkbox
                      variant="primary"
                      checked={field.show}
                      onChange={(e) => {
                        setFieldsDataCopy((prevFieldsData) => {
                          return prevFieldsData.map((item, idx) =>
                            idx === index
                              ? { ...item, show: e.target.checked }
                              : item
                          );
                        });
                      }}
                    />
                    <label>{field.title}</label>
                  </div>
                );
            })}
          </div>

          <div className={css.footer}>
            <div className={css.left}>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => {
                  // alert("Одоогоор ажиллахгүй байна ;)");
                  updateUser({ fieldsData: "restart" });
                  setShowModal(false);
                }}
              >
                Reset
              </Button>
            </div>
            <div className={css.right}>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => {
                  setFieldsDataCopy(fieldsData);
                  setShowModal(false);
                }}
              >
                Цуцлах
              </Button>
              <Button
                variant="primary"
                size="medium"
                onClick={() => {
                  setFieldsData(fieldsDataCopy);
                  updateUser({ fieldsData: fieldsDataCopy });
                  setShowModal(false);
                }}
              >
                Хадгалах
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FilterConfig;

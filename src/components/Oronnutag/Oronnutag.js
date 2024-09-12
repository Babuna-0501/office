import React, { useContext, useState, useEffect } from 'react';
import css from './oronnutag.module.css';
import ProductReportHook from '../../Hooks/ProductsReportHook';

const Oronnutag = () => {
  const prodctx = useContext(ProductReportHook);
  const [allChecked, setAllChecked] = useState(true);

  useEffect(() => {
    const allChosed = prodctx.nutagdata.every(item => item.chosed === true);
    console.log(allChosed);
    setAllChecked(allChosed);
  }, [prodctx.nutagdata]);
  // console.log(
  // 	"NUTAG: ",
  // 	prodctx.nutagdata.map(e => {
  // 		return e.chosed;
  // 	})
  // );

  return (
    <div>
      <div className={css.wrapper}>
        <span>Бүгдийг сонгох</span>
        <img
          src={allChecked ? '/media/on.svg' : '/media/off.svg'}
          alt='open hidden button'
          onClick={() => {
            setAllChecked(checked => !checked);
            const updatedData = prodctx.nutagdata?.map(el => ({
              ...el,
              chosed: !allChecked
            }));
            prodctx.setOronNutagdata(updatedData);
            console.log('qwerty', updatedData);
            prodctx.setNutagdata(updatedData);
          }}
        />
      </div>
      {prodctx.nutagdata?.length > 0
        ? prodctx.nutagdata?.map(x => {
            return (
              <div key={x.location_id} className={css.wrapper}>
                <span>{x.location_name}</span>
                <img
                  src={x.chosed ? '/media/on.svg' : '/media/off.svg'}
                  alt='open hidden button'
                  onClick={() => {
                    console.log('clicked', x.location_id, x.chosed);
                    let aa = [...prodctx.nutagdata];
                    aa.find(item => item.location_id === x.location_id).chosed =
                      !x.chosed;

                    console.log(
                      'AA',
                      // aa.map((e, idx) => e.location_id)
                      aa
                    );
                    // prodctx.setBustype(aa);
                    prodctx.setOronNutagdata(aa);
                    prodctx.setNutagdata(aa);
                  }}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Oronnutag;

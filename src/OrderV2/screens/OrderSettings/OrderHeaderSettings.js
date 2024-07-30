import React, { useRef, useState } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';

function OrderHeaderSettings({ tableFields, userData }) {
  const [dragFields, setDragFields] = useState(
    tableFields.map(item => {
      return {
        ...item,
        isDragging: false
      };
    })
  );

  const resetFields = () => {
    const resetPositions = tableFields.sort(function (a, b) {
      return a.id - b.id || a.parameter.localeCompare(b.parameter);
    });

    return resetPositions.map(item => {
      return { ...item, show: true };
    });
  };

  let itemDrag = useRef();
  let itemDragOver = useRef();

  const onDragStart = (e, index) => {
    itemDrag.current = index;
  };

  const onDragEnter = (e, index) => {
    itemDragOver.current = index;

    const cpArr = [...dragFields];

    let finalArr = [];

    cpArr.forEach(item => {
      finalArr.push({
        ...item,
        title: item.title,
        isDragging: false
      });
    });

    finalArr[index].isDragging = true;

    setDragFields(finalArr);
  };

  const onDragEnd = (e, index) => {
    const arr1 = [...dragFields];

    const fieldItemMain = arr1[itemDrag.current];

    arr1.splice(itemDrag.current, 1);
    arr1.splice(itemDragOver.current, 0, fieldItemMain);

    arr1[itemDragOver.current + 1].isDragging = false;
    arr1[itemDragOver.current].isDragging = true;

    if (itemDragOver.current > 0) {
      arr1[itemDragOver.current - 1].isDragging = false;
    }

    itemDrag.current = null;
    itemDragOver.current = null;

    setDragFields(arr1);
  };

  const updateUser = reset => {
    const data = {
      user_id: userData.id,
      tablePosition2: {
        order: {
          field: reset ? resetFields() : dragFields,
          report: []
        },
        product: {
          field: [],
          report: []
        }
      }
    };

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(data)
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        if (res.code === 200) {
          alert(`${res.message}`);
          window.location.reload();
        }
      })
      .catch(error => {
        alert(`Алдаа гарлаа. ${error}`);
      });
  };

  const updateShow = (e, index) => {
    setDragFields(
      dragFields.map((field, ind) =>
        ind === index ? { ...field, show: !field.show } : field
      )
    );
  };

  return (
    <>
      <p>Багануудын байрлалыг сольж, чирч зөөж, тохируулах боломжтой.</p>
      <div className='field-list'>
        {dragFields.map((field, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className='field-item'
                draggable
                droppable='true'
                onDragStart={e => onDragStart(e, index)}
                onDragEnter={e => onDragEnter(e, index)}
                onDragEnd={e => onDragEnd(e, index)}
                style={{
                  opacity: field.isDragging ? '0.4' : '1'
                }}
              >
                <div className='field-position'>{index + 1}</div>

                <label className='switch'>
                  <input
                    type='checkbox'
                    checked={field.show}
                    onChange={e => updateShow(e, index)}
                  />
                  <span className='slider round' />
                </label>

                <p>{field.Header}</p>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className='settings-buttons'>
        <button onClick={() => updateUser(false)}>Хадгалах</button>
        <button onClick={() => updateUser(true)}>Шинэчлэх</button>
      </div>
    </>
  );
}

export default OrderHeaderSettings;

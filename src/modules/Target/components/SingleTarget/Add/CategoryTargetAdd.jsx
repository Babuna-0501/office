import UserDataHook from '../../../../../Hooks/userHook';
// CSS
import css from './categoryTargetAdd.module.css';

// Images
import {
  CloseDark,
  TugrugGray,
  TugrugGreen,
  TargetWhite
} from '../../../../../assets/icons';

// Components
import {
  Button,
  Checkbox,
  Input,
  LoadingSpinner,
  SuccessPopup
} from '../../../../../components/common';
import { useEffect } from 'react';
import myHeaders from '../../../../../components/MyHeader/myHeader';
import { useState } from 'react';
import ErrorPopup from '../../../../../components/common/ErrorPopup';
import { useContext } from 'react';

export const CategoryTargetAdd = props => {
  const {
    closeHandler,
    initCategories,
    loggedUser,
    setCategoryTargetExist,
    setTarget,
    setTargetExist
  } = props;

  const { categories } = useContext(UserDataHook);

  // const [categories, setCategories] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [errorWhileFetching, setErrorWhileFetching] = useState(false);

  const [categoryName, setCategoryName] = useState('');

  const getData = async () => {
    try {
      setLoading(true);

      const url = `${
        process.env.REACT_API_URL2
      }/supplier/extra/data?supplierId=${loggedUser.company_id.replaceAll(
        '|',
        ''
      )}`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      // setCategories(
      //   initCategories.filter((cat) =>
      //     resData.data.categoryIds.includes(cat.id)
      //   )
      // );
      setOriginalCategories(
        initCategories.filter(cat => resData.data.categoryIds.includes(cat.id))
      );
    } catch (error) {
      setErrorMsg('Алдаа гарлаа. Та дахин оролдоно уу!');
      setErrorWhileFetching(true);
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initCategories, loggedUser.company_id]);

  useEffect(() => {
    let categoriesCopy = [...originalCategories];

    if (categoryName) {
      categoriesCopy = categoriesCopy.filter(category =>
        category.name.toLowerCase().includes(categoryName.toLowerCase())
      );
    }

    // setCategories(categoriesCopy);
  }, [categoryName, originalCategories]);

  const saveHandler = () => {
    try {
      if (selectedCategories.length === 0)
        throw new Error('Ангилал сонгоно уу!');
      if (
        selectedCategories.filter(cat => cat.target).length !==
          selectedCategories.length &&
        selectedCategories.length !== categories.length
      )
        throw new Error('Сонгосон ангилалд төлөвлөгөө оруулна уу!');

      setTarget(prev => ({
        ...prev,
        categories: selectedCategories.map(cat => ({
          _id: cat.id,
          target: { ...cat.target },
          succeeded: { amount: 0, quantity: 0 },
          waiting: { amount: 0, quantity: 0 }
        })),
        type: 1
      }));

      setSuccessMsg('Ангилал төлөвлөгөө амжилттай үүслээ.');
      setTargetExist(true);
      setCategoryTargetExist(true);
      setShowSuccessMsg(true);
    } catch (error) {
      setErrorMsg(error.message);
      setShowErrorMsg(true);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Ангилал төлөвлөгөө</h1>

          <button className={css.closeBtn} type='button' onClick={closeHandler}>
            <CloseDark />
          </button>
        </div>

        <div className={css.content}>
          <div
            className={css.contentHeader}
            style={{ zIndex: categories.length + 1 }}
          >
            <div
              className={css.headerItem}
              style={{
                width: 34,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Checkbox
                checked={
                  selectedCategories
                    .map(category => category.id)
                    .sort()
                    .join(',') ===
                  categories
                    .map(category => category.id)
                    .sort()
                    .join(',')
                }
                onChange={() => {
                  if (
                    selectedCategories
                      .map(category => category.id)
                      .sort()
                      .join(',') ===
                    categories
                      .map(category => category.id)
                      .sort()
                      .join(',')
                  ) {
                    setSelectedCategories([]);
                  } else {
                    setSelectedCategories(categories);
                  }
                }}
              />
            </div>

            <div className={css.headerItem} style={{ width: 200 }}>
              <span className={css.headerText}>Ангилал</span>
              <Input
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                size='small'
                placeholder='Хайх'
              />
            </div>

            <div className={css.headerItem} style={{ width: 120 }}>
              <span className={css.headerText}>Үнийн дүн төлөвлөгөө</span>
            </div>

            <div className={css.headerItem} style={{ width: 100 }}>
              {/* <span className={css.headerText}>Тоо / Ширхэг төлөвлөгөө</span> */}
            </div>
          </div>

          <div className={css.contentBody}>
            {!loading &&
              categories.length > 0 &&
              categories.map((category, index) => {
                return (
                  <SingleCategory
                    key={`cat-${index}`}
                    zIndex={categories.length - index}
                    category={category}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                );
              })}

            {loading && (
              <div className={css.spinner}>
                <LoadingSpinner />
              </div>
            )}

            {!loading && categories.length === 0 && (
              <div className={css.notFound}>
                <TargetWhite />
                <span>Илэрц олдсонгүй</span>
              </div>
            )}
          </div>
        </div>

        <div className={css.footer}>
          <Button onClick={closeHandler} variant='secondary' size='medium'>
            Цуцлах
          </Button>
          <Button
            onClick={saveHandler}
            variant='primary'
            size='medium'
            width={116}
          >
            Хадгалах
          </Button>
        </div>
      </div>

      <ErrorPopup
        show={showErrorMsg}
        message={errorMsg}
        closeHandler={() => {
          setShowErrorMsg(false);
          setErrorMsg('');
          errorWhileFetching && getData();
        }}
      />

      <SuccessPopup
        show={showSuccessMsg}
        message={successMsg}
        closeHandler={() => {
          setShowSuccessMsg(false);
          setSuccessMsg('');
          closeHandler();
        }}
      />
    </>
  );
};

const SingleCategory = ({
  zIndex,
  category,
  selectedCategories,
  setSelectedCategories
}) => {
  const checked = selectedCategories.map(cat => cat.id).includes(category.id);

  const [amount, setAmount] = useState(
    category.target ? category.target.amount : ''
  );
  const [quantity, setQuantity] = useState(
    category.target ? category.target.quantity : ''
  );

  useEffect(() => {
    if (amount) {
      setSelectedCategories(prev =>
        prev.map(cat =>
          cat.id === category.id
            ? { ...cat, target: { amount: Number(amount), quantity: null } }
            : cat
        )
      );
    } else {
      setSelectedCategories(prev =>
        prev.map(cat => {
          if (cat.id === category.id) {
            delete cat.target;
            return cat;
          }
          return cat;
        })
      );
    }
  }, [amount, category, setSelectedCategories]);

  useEffect(() => {
    if (quantity) {
      setSelectedCategories(prev =>
        prev.map(cat =>
          cat.id === category.id
            ? { ...cat, target: { amount: null, quantity: Number(quantity) } }
            : cat
        )
      );
    } else {
      setSelectedCategories(prev =>
        prev.map(cat => {
          if (cat.id === category.id) {
            delete cat.target;
            return cat;
          }
          return cat;
        })
      );
    }
  }, [quantity, category, setSelectedCategories]);

  return (
    <div
      className={`${css.contentRow} ${checked && css.checked}`}
      style={{ zIndex }}
    >
      <div
        className={css.contentItem}
        style={{ width: 34, justifyContent: 'center' }}
      >
        <Checkbox
          checked={checked}
          onChange={() => {
            if (checked) {
              setSelectedCategories(prev =>
                prev.filter(cat => cat.id !== category.id)
              );
              setAmount('');
              setQuantity('');
            } else {
              setSelectedCategories(prev => [...prev, category]);
            }
          }}
        />
      </div>

      <div className={css.contentItem} style={{ width: 200 }}>
        <span className={css.contentText}>{category.name}</span>
      </div>

      <div className={css.contentItem} style={{ width: 120 }}>
        <Input
          type='number'
          value={amount}
          onChange={e => setAmount(e.target.value)}
          disabled={!checked || quantity}
          size='small'
          placeholder='0'
          icon={amount ? <TugrugGreen /> : <TugrugGray />}
          iconposition='right'
        />
      </div>

      <div className={css.contentItem} style={{ width: 100 }}>
        {/* <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          disabled={!checked || amount}
          size="small"
          placeholder="0"
        /> */}
      </div>
    </div>
  );
};

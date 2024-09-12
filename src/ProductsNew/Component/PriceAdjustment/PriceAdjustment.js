import React from 'react';
import './PriceAdjustment.css';

const data = new Array(12).fill({
  name: 'Компанийн нэр',
  register: '3290178',
  industry: 'Хорека',
  subIndustry: 'Паб, лаунж',
  license: 'Аж ахуйн нэгж',
  sector: 'Худалдаа',
  city: 'Улаанбаатар',
  district: 'Сонгинохайрхан',
  khoroo: '1-р хороо',
  block: 'А байр',
  price: '100,000₮',
});

const PriceAdjustment = () => {
  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Ялгаатай үнийн тохиргоо</h2>
        <button className="close-button">×</button>
      </div>
      <div className="modal-body">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Tradeshop name</th>
              <th>Регистр</th>
              <th>Суваг</th>
              <th>Ү/ажиллагааны чиглэл</th>
              <th>ААН/ТТИ</th>
              <th>Зэрэглэл </th>
              <th>Хот/Аймаг</th>
              <th>Дүүрэг/Сум</th>
              <th>Хороо</th>
              <th>Бүсчлэл</th>
              <th>Төлбөрийн хэлбэр</th>
              <th>Үнийн дүн</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{row.name}</td>
                <td>{row.register}</td>
                <td>{row.industry}</td>
                <td>{row.subIndustry}</td>
                <td>{row.license}</td>
                <td>{row.sector}</td>
                <td>{row.city}</td>
                <td>{row.district}</td>
                <td>{row.khoroo}</td>
                <td>{row.block}</td>
                <td>
                  <select>
                    <option value="Бэлэн">Бэлэн</option>
                    <option value="Карт">Карт</option>
                    <option value="Бусад">Бусад</option>
                  </select>
                </td>
                <td>
                  <input type="text" value={row.price} disabled />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="modal-footer">
        <button className="cancel-button">Цуцлах</button>
        <button className="submit-button">Нэмэх</button>
      </div>
    </div>
  );
};

export default PriceAdjustment;

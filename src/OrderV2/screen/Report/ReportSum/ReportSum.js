import React from 'react';
import './reportSum.css';

const ReportSum = () => {
  return (
    <div className='reportSum'>
        <h3>Захиалгын нэгтгэл</h3>
        <div className='deliver_date'>Хүргүүлэх огноо</div>
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Бүтээгдэхүүн</th>
                <th>SKU</th>
                <th>Barcode</th>
                <th>Нэгж үнэ</th>
                <th>Тоо ширхэг</th>
                <th>Нийт үнэ</th>
            </tr>
            </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>Гуяны цул 1кг</td>
            <td>1101200</td>
            <td>68686868686</td>
            <td>22,900₮</td>
            <td>5</td>
            <td>11434344₮</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Гуяны цул 1кг</td>
            <td>1101200</td>
            <td>68686868686</td>
            <td>22,900₮</td>
            <td>5</td>
            <td>11434344₮</td>
        </tr>
        </tbody>
        </table>
        <div className='product_wrapper'>
            <div className='product_class'>Нийт барааны төрөл : 2</div>
            <div className='product_class'>Нийт бүтээгдэхүүн : 15ш</div>
            <div className='product_sum'>Нийт үнийн дүн : 773,500₮</div>
        </div>
        <div className='report_btm'>
            <div>Захиалгын нэгтгэл үүсгэсэн:____________________</div>
            <div>Захиалгын хүлээн авсан: _____________________</div>
            <div>Захиалгыг хянасан: ________________________</div>
            <span>Тэмдэг</span>
        </div>
      
    </div>
  )
}

export default ReportSum
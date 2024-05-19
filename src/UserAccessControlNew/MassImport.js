import readXlsxFile from 'read-excel-file'
import {useState} from 'react'
import {saveNewProduct} from './Form'

const MassImport = (props) => {
    const [saving, setSaving]  = useState(false)
    //Барааны нэр   Баркод  Хэлбэр  Бодит савлалт   Зардаг савлалт  Ерөнхий ангилал Дэд ангилал Үйлдвэрлэгч улс Дуусах хугацаа Сери Үйлдвэрлэгч Үнэ Сагслах тоо Үлдэгдэл Эрэмбэ
    const foobar = (e) => {
        // Extracting column names
        let orders = {}
        let counter = 0
        readXlsxFile(e.target.files[0]).then((rows) => {
            console.log('--------------------------------------------------------------------------------')
            console.log('rows')
            console.log(rows)
            console.log('--------------------------------------------------------------------------------')
            rows.map(row => {
                if(counter === 0) {
                    row.map((index, column) => {
                        orders[index.trim()] = column
                    })
                    counter++
                    let temp = {}
                    for(let column in orders) {
                        temp[orders[column]] = column
                    }
                    let tempHTML = ''
                    for(let col in temp) {
                        tempHTML += 
                        `
                            <div>
                                <div class="width300px">
                                    <p class="fullWidth">${temp[col]}</p>
                                </div>
                            </div>
                        `
                    }
                    document.getElementById('productList').insertAdjacentHTML('beforeEnd',
                        `
                            <div class="foo paddingtop1rem">
                                ${tempHTML}
                            </div>
                        `
                    )
                }
            })
        })
        console.log(orders)
        readXlsxFile(e.target.files[0]).then((rows) => {
            let counter = 0
            rows.map(row => {
                console.log(row)
                const uid = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
                if(counter > 0) {
                    document.getElementById('productList').insertAdjacentHTML('beforeEnd', 
                        `
                            <div class="foo paddingtop1rem productImportData">
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Барааны нэр']]??''}" class="fullWidth fullHeight inputMassImport productName" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Баркод']]??''}" class="fullWidth fullHeight inputMassImport productBarcode" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Хэлбэр']]??''}" class="fullWidth fullHeight inputMassImport productForm" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Бодит савлалт']]??''}" class="fullWidth fullHeight inputMassImport productBoditSavlalt" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Ерөнхий ангилал']]??''}" class="fullWidth fullHeight inputMassImport productCategory" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Дэд ангилал']]??''}" class="fullWidth fullHeight inputMassImport productSubCategory" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Үйлдвэрлэгч улс']]??''}" class="fullWidth fullHeight inputMassImport productCountry" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Дуусах хугацаа']]??''}" class="fullWidth fullHeight inputMassImport productExpireDate" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Сери']]??''}" class="fullWidth fullHeight inputMassImport productSeries" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Үйлдвэрлэгч']]??''}" class="fullWidth fullHeight inputMassImport productManufacturer" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Үнэ']]??''}" class="fullWidth fullHeight inputMassImport productBasePrice" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Сагслах тоо']]??''}" class="fullWidth fullHeight inputMassImport productIncase" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Үлдэгдэл']]??''}" class="fullWidth fullHeight inputMassImport productStock" />
                                    </div>
                                </div>
                                <div>
                                    <div class="width300px paddingright1rem">
                                        <input type="text" value="${row[orders['Эрэмбэ']]??''}" class="fullWidth fullHeight inputMassImport productPriority" />
                                    </div>
                                </div>
                            </div>
                        `
                    )
                }
                counter++
            })
        })
    }
    const save = () => {
        console.log('saving')
        setSaving(true)
        const data = document.querySelectorAll('.productImportData')
        console.log(data)
        for(let i = 0; i < data.length; i++) {
            const productData = data[i]
            console.log(productData)
            console.log(productData.querySelector('.productBarcode').value)
        }
        console.log(saveNewProduct)
    }
    return (
        <div id="overlaypage_bg">
            <div id="overlaypage">
                <div className="pageHeader" id="pageHeader">
                    <p>Бүтээгдэхүүн масс импортлох</p>
                    <span className="pageClose" onClick={() => props.setProductMassImport(false)}><img src="https://admin.ebazaar.mn/images/close.svg" alt="" /></span>
                </div>
                <div id="pageBody" style={{top: '60px', right: '0', bottom: '52px', left: '0', padding: '0 1rem'}}>
                    <input type="file" className="margintop1rem marginleft1rem" id="massimport" onChange={(e) => foobar(e)} style={{width: '200px'}} />
                </div>
                <div id="productList"></div>
                <div id="overlaypage_footer">
                    <button className={'pageButton' + (saving ? ' disabled' : '')} onClick={() => save()} disabled={saving ? true : false}>{saving ? 'Түр хүлээнэ үү...' : 'Хадгалах'}</button>
                </div>
            </div>
        </div>
    )
}

export default MassImport
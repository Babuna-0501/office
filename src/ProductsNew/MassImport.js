import readXlsxFile from 'read-excel-file'

const MassImport = (props) => {
    const foobar = (e) => {
        readXlsxFile(e.target.files[0]).then((rows) => {
            let counter = 0
            rows.map(row => {
                if(counter > 0) {
                    document.getElementById('productList').insertAdjacentHTML('beforeEnd', 
                        `
                            <div class="listEntry">
                                <div class="entryBlock width300px noPadding"><input type="text" value="${row[1]}" class="fullWidth fullHeight noBorder paddingright1rem" /></div>
                                <div class="entryBlock width180px noPadding"><input type="text" value="${row[2]}" class="fullWidth fullHeight noBorder paddingright1rem" /></div>
                            </div>
                        `
                    )
                }
                counter++
            })
        })
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
                    <button className="pageButton" onClick={() => console.log('yeah')}>Хадгалах</button>
                </div>
            </div>
        </div>
    )
}

export default MassImport
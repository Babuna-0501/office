import {useState, useContext, useEffect} from 'react'

const List = (props) => {
    // Search parameters
    const [searchID, setSearchID] = useState(null)
    const [searchDate, setSearchDate] = useState(false)
    const [searchName, setSearchName] = useState(false)
    const [searchRegister, setSearchRegister] = useState(false)
    const [searchRegisterDate, setSearchRegisterDate] = useState(false)
    const [selectedCustomers, setSelectedCustomers] = useState([])
    // Block widths
    const widths = props.widths
    const renderHTML = []
    let customers = props.data
    // Matching records
    customers.map(customer => {
        let foo = true
        if(searchID && searchID.toString().length > 0) {
            foo = customer.tradeshop_id.toString().includes(searchID)  ? true : false
            if(foo === false) {
                return
            }
        }
        if(searchName && searchName.toString().length > 0) {
            foo = customer.customer_name.toString().toLowerCase().includes(searchName)  ? true : false
            if(foo === false) {
                return
            }
        }
        if(searchRegister && searchRegister.toString().length > 0) {
            foo = customer.business_register.toString().toLowerCase().includes(searchRegister)  ? true : false
            if(foo === false) {
                return
            }
        }
        if(searchRegisterDate && searchRegisterDate.toString().length > 0) {
            foo = customer.created_date.toString().includes(searchRegisterDate)  ? true : false
            if(foo === false) {
                return
            }
        }
        console.log(customer)
        if(foo) {
            renderHTML.push(
                <>
                    <div className="listEntry">
                        <div className="entryBlock" style={{width: widths[0]}}>
                            <input type="checkbox" data-id={customer.tradeshop_id} onClick={(e) => select(customer, e)} className="customerToggle" />
                        </div>
                        <div className="entryBlock" style={{width: widths[1]}} onClick={() => props.setCustomer(customer)}>
                            <p>{customer.tradeshop_id}</p>
                        </div>
                        <div className="entryBlock" style={{width: widths[2]}}>
                            <p>{customer.created_date ? customer.created_date.substr(0, 10) : null}</p>
                        </div>
                        <div className="entryBlock" style={{width: widths[3]}}>
                            <p>{customer.customer_name}</p>
                        </div>
                        <div className="entryBlock" style={{width: widths[4]}}>
                            <p>{customer.business_register}</p>
                        </div>
                    </div>
                </>
            )
        }
    })
    const selectAll = (e) => {
        let selecteds = []
        let temp = document.querySelectorAll('.customerToggle')
        for (const checkbox of temp) {
            if(e.target.checked) {
                selecteds.push(parseInt(checkbox.getAttribute('data-id')))
            }
            checkbox.checked = e.target.checked ? true : false
        }
        setSelectedCustomers(selecteds)
    }
    const select = (customer, e) => {
        let temp = JSON.parse(JSON.stringify(selectedCustomers))
        if(e.target.checked) {
            if(temp.indexOf(parseInt(customer.tradeshop_id)) === -1) {
                temp.push(parseInt(customer.tradeshop_id))
            }
        } else {
            temp.splice(temp.indexOf(parseInt(customer.tradeshop_id)),1)
        }
        setSelectedCustomers([...temp])
    }
    return (
        <div id="pageList">
            <div className="listEntry" id="listHeader" style={{minWidth: props.widthsSum}}>
                <div className="entryBlock" style={{width: widths[0], justifyContent: 'center'}}>
                    <input type="checkbox" onClick={(e) => selectAll(e)} />
                </div>
                <div className="entryBlock" style={{width: widths[1]}}>
                    <div className="entryHeader">
                        <label>Дугаар</label>
                        <input type="text" onKeyUp={(e) => setSearchID(e.target.value)} />
                    </div>
                </div>
                <div className="entryBlock" style={{width: widths[2]}}>
                    <div className="entryHeader">
                        <label>Огноо</label>
                        <input type="date" onChange={(e) => setSearchRegisterDate(e.target.value)} />
                    </div>
                </div>
                <div className="entryBlock" style={{width: widths[3]}}>
                    <div className="entryHeader">
                        <label>Нэр</label>
                        <input type="text" onKeyUp={(e) => setSearchName(e.target.value)} />
                    </div>
                </div>
                <div className="entryBlock" style={{width: widths[4]}}>
                    <div className="entryHeader">
                        <label>Регистр</label>
                        <input type="text" onKeyUp={(e) => setSearchRegister(e.target.value)} />
                    </div>
                </div>
            </div>
            {renderHTML}
        </div>
    )
}

export default List
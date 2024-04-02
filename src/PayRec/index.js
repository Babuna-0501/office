import Header from './Header'
import Payable from './Payable'
import Receivable from './Receivable'
import {useState, useEffect} from 'react'
import css from "./style.module.css"

const PayRec = () => {
	const [activeTab, setActiveTab] = useState('payable')
	const tabs = {
		'payable': <Payable />,
		'receivable': <Receivable />
	}
	return (
		<>
			<Header />
			<div>
				<div id={css.tabs}>
					<span onClick={() => setActiveTab('payable')} className={css.tab} style={{borderBottom: activeTab === 'payable' ? '3px solid #2AB674' : ''}}>Өглөг</span>
					<span onClick={() => setActiveTab('receivable')} className={css.tab} style={{borderBottom: activeTab === 'receivable' ? '3px solid #2AB674' : ''}}>Авлага</span>
				</div>
				<div id="list">{tabs[activeTab]}</div>
			</div>
		</>
	)
}

export default PayRec
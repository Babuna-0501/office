import {useState, useEffect, useContext} from 'react'
import css from '../../style.module.css'

const Settings = (props) => {
	const [activeTab, setActiveTab] = useState('box')
	return (
		<div>
			<div>
				<span onClick={() => setActiveTab('accumulation')} className={activeTab === 'accumulation' ? css.subtab + ' ' + css.activesubtab : css.subtab}>Нэгтгэлээр</span>
				<span onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? css.subtab + ' ' + css.activesubtab : css.subtab}>Хуудсаар</span>
			</div>
			{activeTab === 'orders' ? <Orders wh={props.wh} /> : <div>Зарлагын мэдээлэл байхгүй байна.</div>}
		</div>
	)

}

export default Settings
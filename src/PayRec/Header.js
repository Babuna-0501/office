import css from './style.module.css'
import {useState, useContext} from 'react'

const Header = () => {
	const [activeTab, setActiveTab] = useState(false)
	return (
		<>
			<div className={css.header}>
				<div>
					<span className={css.wh_headerTitle}>Өглөг, авлага</span>
					<select style={{display: 'none'}}>
						<option value="currentmonth">Энэ сар</option>
						<option value="pastmonth">Өнгөрсөн сар</option>
						<option value="selectedinterval">Огноогоор шүүх</option>
					</select>
				</div>
				<div className={css.headerRight}>
					<button className={css.button + ' ' + css.primary + ' ' + css.large}>Button</button>
				</div>
			</div>
		</>
	)
}

export default Header
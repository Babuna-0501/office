import css from './style.module.css'

const Header = (props) => {
	const {activeTab, setActiveTab} = props.tab
	const activeTabStyle = css.tab_hover + ' ' + css.active
	const tabStyle = css.tab_hover
	return (
		<>
			<div className={css.header}>
				<div>
					<span className={activeTab === 'zahialga' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('zahialga')}>Захиалга</span>
					<span className={activeTab === 'report' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('report')}>Тайлан</span>
					<span className={activeTab === 'delivery' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('delivery')}>Түгээлт</span>
					<span className={activeTab === 'settings' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('settings')}>Тохиргоо</span>
					<select>
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
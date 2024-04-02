import { useState } from "react"

const DateSelector = (props) => {
	const [dateInterval, setDateInterval] = useState('today')
	return (
		<div id="dateselector_bg">
			<div id="dateselector">
				<div className="leftblock">
					<span className={dateInterval === 'today' ? 'active' : null} onClick={() => setDateInterval('today')}>Өнөөдөр</span>
					<span className={dateInterval === 'thisweek' ? 'active' : null} onClick={() => setDateInterval('thisweek')}>Энэ долоо хоног</span>
					<span className={dateInterval === 'thismonth' ? 'active' : null} onClick={() => setDateInterval('thismonth')}>Энэ сар</span>
					<span>Интервал</span>
					<div style={{margin: '0 2rem 0 0'}}>
						<button className="button primary large" style={{width: '100%', margin: '0 2rem 0 0!important'}}>Сонгох</button>
					</div>
				</div>
				<div className="rightblock">
					<span className="close" onClick={() => props.setDateSelector(false)}>X</span>
				</div>
			</div>
		</div>
	)
}

export default DateSelector
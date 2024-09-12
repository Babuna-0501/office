import {useState, useEffect} from 'react'
import myHeaders from "../../components/MyHeader/myHeader"

const Settings = (props) => {
	console.log(props)
	return (
		<div className="padding1rem">
			<div>
				<label>Утас:</label>
				<input type="text" value={props.config.phone ?? ''} /> 
			</div>
			<div>
				<label>Дүүргийн татварын код:</label>
				<input type="text" /> 
			</div>
		</div>
	)
}

export default Settings
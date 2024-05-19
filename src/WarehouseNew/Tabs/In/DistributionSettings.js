import User from './User'
import {useState} from 'react'
import myHeaders from '../../../components/MyHeader/myHeader'

const DistributionSettings = (props) => {
	const [saving, setSaving] = useState(false)
	const renderHTML = []
	const [courier, setCourier] = useState(props.data && props.data.externalData && props.data.externalData.distributionSettings && props.data.externalData.distributionSettings.courier ? props.data.externalData.distributionSettings.courier : 0)
	props.supplierUsers.map(user => {
		renderHTML.push(<User userData={user} data={props.data} setCourier={setCourier} courier={courier} />)
	})
	const save = () => {
		setSaving(true)
		const id = props.data._id
		let externalData = props.data.externalData ?? {}
		if(!externalData['distributionSettings']) {
			externalData['distributionSettings'] = {}
		}
		externalData['distributionSettings']['courier'] = courier
		const url = `https://api2.ebazaar.mn/api/shipment`
		const raw = JSON.stringify({
			"_id": id,
			"externalData": externalData
		})
		var requestOptions = {
			method: "PATCH",
			headers: myHeaders,
			redirect: "follow",
			body: raw
	    }
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			if(response.success === true && response.message === 'success') {
				props.fnSuccessfullySetCourier(props.data._id, courier)
			} else {
				setSaving(false)
				alert('Алдаа гарлаа.')
			}
		})
	}
	return (
		<div className="container-modal flexCentered" id="container-modal">
			<div className="width800px height600px backgroundWhite zindexUpMost borderRadius2px positionRelative">
				<div className="height80px positionAbsoluteTop" style={{padding: '1.25rem 2rem'}}>
					<h1>Түгээлт/хүргэлтийн ажилтан сонгох</h1>
				</div>
				<div style={{position: 'absolute', right: '0', left: '0', top: '60px', bottom: '60px', overflow: 'auto', padding: '0 2rem 0 0'}}>
					{renderHTML}
				</div>
				<div className="height80px positionAbsoluteBottom" style={{display: 'flex', alignItems: 'flex-end', right: '0', left: '0'}}>
					<div style={{width: '100%', textAlign: 'right', padding: '0 2rem 1.25rem 0'}}>
						<button disabled={saving ? true : false} style={{marginRight: '1rem !important'}} className="button large marginleft1rem" onClick={() => props.setDistributionSettings(false)}>Цуцлах</button>
						<button disabled={saving ? true : false} className="button primary large margingright1rem" onClick={() => save()}>Хадгалах</button>
					</div>
				</div>
			</div>
			<div className="container-modal-bg"></div>
		</div>
	)
}

export default DistributionSettings
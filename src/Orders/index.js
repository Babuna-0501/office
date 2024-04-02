import Header from './Header'
import {useState, useContext, useEffect} from 'react'
import myHeaders from "../components/MyHeader/myHeader"
import Order from './Order/List'
import Delivery from './Delivery/List'

const Index = () => {
	const [activeTab, setActiveTab] = useState('zahialga')
	const tab = {
		'zahialga': <Order />,
		'delivery': <Delivery />
	}
	return (
		<>
			<Header tab={{activeTab, setActiveTab}} />
			{tab[activeTab]}
		</>
	)
}

export default Index
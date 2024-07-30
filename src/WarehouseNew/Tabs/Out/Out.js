import { useState } from 'react';
import css from '../../style.module.css';
import Orders from './Orders';

const Out = (props) => {
	const [activeTab, setActiveTab] = useState('orders');

	return (
		<div>
			<div>
				<span
					onClick={() => setActiveTab('accumulation')}
					className={activeTab === 'accumulation' ? `${css.subtab} ${css.activesubtab}` : css.subtab}
				>
					Нэгтгэлээр
				</span>
				<span
					onClick={() => setActiveTab('orders')}
					className={activeTab === 'orders' ? `${css.subtab} ${css.activesubtab}` : css.subtab}
				>
					Хуудсаар
				</span>
			</div>
			{activeTab === 'orders' ? <Orders wh={props.wh} /> : <div>Зарлагын мэдээлэл байхгүй байна.</div>}
		</div>
	);
}

export default Out;

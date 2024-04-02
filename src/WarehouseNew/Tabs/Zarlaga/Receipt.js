import {useContext} from 'react'
import html2pdf from "html2pdf.js"
import {WarehouseContext} from '../../Warehouse'

const Receipt = (props) => {
	const whcontext = useContext(WarehouseContext)
	console.log(whcontext.allProducts)
	console.log(props)
	let bar = props.data.products
	console.log(props.form)
	let foo = {}
	whcontext.allProducts.map(product => {
		foo[product._id] = product
	})
	bar.map((product, index) => {
		bar[index]['_id'] = bar[index]['productId']
		bar[index]['name'] = foo[bar[index]['productId']]['name']
		bar[index]['image'] = []
		bar[index]['image'][0] = foo[bar[index]['productId']]['image'][0]
		bar[index]['bar_code'] = foo[bar[index]['productId']]['bar_code']
		bar[index]['incase'] = foo[bar[index]['productId']]['incase']
	})
	console.log(bar)
	const handlePrint = () => {
		const rep = document.getElementById("a4receipt");
		var opt = {
		margin: [10, 0, 22, 0],
		filename: `Зарлагын баримт.pdf`,
		image: { type: "jpeg", quality: 1 },
		html2canvas: {
		dpi: 300,
		scale: 2,
		letterRendering: true,
		useCORS: true,
		},
		jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
		};
		html2pdf().set(opt).from(rep).save();
	}
	const currentDate = new Date()
	let counter = 1
	return (
		<div id="overlaypage_bg">
			<div id="overlaypage">
				<div id="overlaypage_header">
					<h1>Зарлагын баримт хэвлэх</h1>
				</div>
				<div id="container-a4receipt">
					<div id="a4receipt">
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<div style={{width: '24%'}}>
								<p>НУГАН ЭХНБ</p>
								<p>Чингэлтэй дүүрэг, 3-р хороо, Монгол Ньюс компанийн байр 1-А</p>
								<p>Утас: 9199 6606, 7011 1248</p>
								<p style={{margin: '10px 0 0 0'}}>Харилцагч: НУГАН ФАРМ ХХК сэс</p>
								<p style={{margin: '3px 0 0 0'}}>Регистер №: 6571881</p>
								<p style={{margin: '3px 0 0 0'}}>Утас: 89041248</p>
								<p style={{margin: '3px 0 0 0'}}>Хаяг: ЧД, 3-р хороо, Монгол Ньюс ХХК 1 А тоот</p>
							</div>
							<div style={{width: '30%', textAlign: 'cen'}}>
								<h1 style={{fontWeight: 'bold', textAlign: 'center'}}>ЗАРЛАГЫН БАРИМТ №{props.data.generateId.slice(-7)}</h1>
								<h1 style={{textAlign: 'center'}}>Дансны борлуулалт байгууллага</h1>
							</div>
							<div style={{width: '24%'}}>
								<p>{currentDate.getDay()} / {currentDate.getMonth()} / {currentDate.getFullYear()}</p>
								<p style={{margin: '60px 0 0 0'}}>Эд хариуцагч: ..............................</p>
								<p>Дансны мэдээлэл: НУГАН ХХК, ХААН Банк, 5077055035</p>
							</div>
						</div>
						<div>
							<table>
								<tr>
									<th rowspan="2">Д/д</th>
									<th rowspan="2">Барааны нэр</th>
									<th rowspan="2">Серийн № (Модель)</th>
									<th rowspan="2">Дуусах хугацаа</th>
									<th rowspan="2">Х.нэгж</th>
									<th rowspan="2">Тоо</th>
									<th rowspan="2">Нэгж үнэ</th>
									<th rowspan="2">Нийт үнэ</th>
									<th colspan="2">Хөнгөлөлт</th>
									<th rowspan="2">Төлөа дүн</th>
								</tr>
								<tr>
									<th>%</th>
									<th>Хямдрал</th>
								</tr>
								{bar.map(product => {
									return (
										<tr>
											<td width="5%">{counter++}</td>
											<td>{product.name}</td>
											<td width="5%"></td>
											<td width="5%"></td>
											<td width="5%"></td>
											<td width="5%"></td>
											<td width="5%"></td>
											<td width="5%"></td>
											<td width="5%"></td>
											<td width="5%"></td>
											<td width="5%"></td>
										</tr>
									)
								})}
							</table>
						</div>
					</div>
				</div>
				<div id="overlaypage_footer">
					<div className="right">
						<button onClick={handlePrint}>Хэвлэх</button>
					</div>
				</div>
				<span id="overlaypage_close" onClick={() => props.setPrintReceipt(false)}>x</span>
			</div>
		</div>
	)
}

export default Receipt
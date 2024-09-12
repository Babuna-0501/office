const Header = (props) => {
    return (
        <div id="pageHeaderHead">
            <span className="headerBlock">
                <h1>Бүтээгдэхүүн</h1>
            </span>
            <span className="headerBlock">
                <span className={props.tab === 'products' ? 'tab active' : 'tab'} onClick={() => props.setTab('products')}>Бүтээгдэхүүн</span>
            </span>
            <span className="headerBlock">
                <span className={props.tab === 'settings' ? 'tab active' : 'tab'} onClick={() => props.setTab('settings')}>Тохиргоо</span>
            </span>
        </div>
    )
}

export default Header
const Header = (props) => {
    return (
        <div id="pageHeaderHead">
            <span className="headerBlock">
                <h1>Харилцагч</h1>
            </span>
            <span className="headerBlock">
                <span className={props.tab === 'customer' ? 'tab active' : 'tab'} onClick={() => props.setTab('customer')}>Харилцагч</span>
            </span>
        </div>
    )
}

export default Header
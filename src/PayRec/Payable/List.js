import Entry from './Entry'

const List = (props) => {
	let Entries = props.data.data.map(entry => {
		return <Entry data={entry} />
	})
	return Entries
}

export default List
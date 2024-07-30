import './search.css';
import searchSvg from './search.svg';

function Search({ onChange }) {
  return (
    <div className='search'>
      <input type='text' placeholder='Хайх' onChange={onChange} />

      <div className='search-icon'>
        <img src={searchSvg} alt='search' />
      </div>
    </div>
  );
}

export default Search;

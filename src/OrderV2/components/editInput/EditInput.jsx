import './editInput.css';

function EditInput({ value = 0, onChange }) {
  return (
    <input
      className='edit-input'
      type='number'
      value={value}
      min={0}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default EditInput;

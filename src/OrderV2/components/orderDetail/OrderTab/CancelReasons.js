function CancelReasons({ reasons = [], onChange }) {
  return (
    <select
      className='cancel-reason-select'
      onChange={e => onChange(e.target.value)}
      defaultValue='--'
      style={{ maxWidth: '320px' }}
    >
      <option value='--'>-- Сонгох --</option>

      {reasons.map((item, index) => {
        return (
          <option key={index} value={item.ID}>
            {item.reason}
          </option>
        );
      })}
    </select>
  );
}

export default CancelReasons;

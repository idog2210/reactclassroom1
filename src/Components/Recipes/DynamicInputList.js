const DynamicInputList = ({ label, values, onChange, id }) => {
  return (
    <div className="dynamic-list">
      <label htmlFor={id}>{label}</label>

      {values.map((value, index) => (
        <input key={index} type="text" value={value} onChange={(e) => onChange(e, index)} />
      ))}
    </div>
  );
};

export default DynamicInputList;

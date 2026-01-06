const Select = ({ label, value, options, onChange }) => {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-solid border-gray-300 rounded"
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.val ?? opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

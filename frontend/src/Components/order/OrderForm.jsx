import React, { useRef } from 'react';

/**
 * OrderForm
 * - formData: { name, number, address, note }
 * - onChange: setter function (keeps your existing "prev => ({...prev, ...})" pattern)
 */
const OrderForm = ({ formData, onChange }) => {
  // refs for each input so we can focus programmatically
  const nameRef = useRef(null);
  const numberRef = useRef(null);
  const addressRef = useRef(null);
  const noteRef = useRef(null);

  const refsOrder = ['name', 'number', 'address', 'note'];
  const refsMap = { name: nameRef, number: numberRef, address: addressRef, note: noteRef };

  const handleChange = (e) => onChange(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // move focus to the next input when Enter is pressed
  const handleKeyDown = (e, fieldName) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // avoid accidental form submit
      const idx = refsOrder.indexOf(fieldName);
      if (idx >= 0 && idx < refsOrder.length - 1) {
        const nextRef = refsMap[refsOrder[idx + 1]];
        nextRef.current?.focus();
      } else {
        // last field: blur (or call an onSubmit prop if you want to submit here)
        refsMap[fieldName].current?.blur();
      }
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        ref={nameRef}
        onChange={handleChange}
        required
        onKeyDown={(e) => handleKeyDown(e, 'name')}
        placeholder="Enter your name"
      />
      <Input
        label="Contact Number"
        name="number"
        value={formData.number}
        ref={numberRef}
        onChange={handleChange}
        required
        onKeyDown={(e) => handleKeyDown(e, 'number')}
        placeholder="Enter your number"
      />
      <Input
        label="Delivery Address"
        name="address"
        value={formData.address}
        ref={addressRef}
        onChange={handleChange}
        required
        onKeyDown={(e) => handleKeyDown(e, 'address')}
        placeholder="Enter your address"
      />
      <Input
        label="Note (optional)"
        name="note"
        value={formData.note}
        ref={noteRef}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'note')}
        placeholder="Enter your note"
      />
    </div>
  );
};

/**
 * Input - functional input component that forwards ref to the underlying <input>
 */
const Input = React.forwardRef(({ label, name, value, onChange, required, onKeyDown, placeholder }, ref) => {
  const inputType = label.toLowerCase().includes('number') || name === 'number' ? 'tel' : 'text';
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        ref={ref}
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        className="w-full border border-[#e75c3a] rounded px-3 py-2 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
});

export default OrderForm;

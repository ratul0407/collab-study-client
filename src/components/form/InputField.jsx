import { useContext, useState } from "react";
import { FormContext } from "../../pages/dashboard/tutor/CreateStudySession";

function InputField({
  split = false,
  id,
  label,
  type,
  value,
  placeholder,
  readOnly = false,
  defaultValue,
  custom = "",
  name,
  min,
  max,
  required = false,
  regErr = false,
  onChange,
}) {
  const { register } = useContext(FormContext);
  return (
    <div className={`form control ${split && "lg:w-1/2"} `}>
      <label htmlFor={id} className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly={readOnly}
        {...register(name)}
        className={`input input-bordered w-full border-dashed border-red-500 ${custom} ${regErr && "border-red-500 outline-red-500"}`}
        required={required}
        min={min}
        max={max}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;

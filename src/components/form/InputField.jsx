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
  onChange,
  regErr,
  errorMessage = "",
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
        className={`input input-bordered w-full ${custom} ${regErr && "border-dashed border-red-500"}`}
        required={required}
        min={min}
        max={max}
        onChange={onChange}
      />
      <label className="label-alt text-sm text-red-500">
        {regErr && errorMessage}
      </label>
    </div>
  );
}

export default InputField;

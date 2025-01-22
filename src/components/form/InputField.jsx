import { useContext } from "react";
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
        className={`input input-bordered w-full ${custom}`}
        required={required}
        min={min}
        max={max}
      />
    </div>
  );
}

export default InputField;

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isInvalid: boolean;
  errorValidationMessage: string;
}

const Input = ({
  id,
  label,
  isInvalid,
  errorValidationMessage,
  ...props
}: InputProps) => {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">
        {isInvalid && <p>{errorValidationMessage}</p>}
      </div>
    </div>
  );
};

export default Input;

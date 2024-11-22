import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isValid: boolean;
  errorValidationMessage: string;
}

const Input = ({
  id,
  label,
  isValid,
  errorValidationMessage,
  ...props
}: InputProps) => {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">
        {!isValid && <p>{errorValidationMessage}</p>}
      </div>
    </div>
  );
};

export default Input;

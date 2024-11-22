import { useState, ChangeEvent } from 'react';

const useInput = (
  defaultValue: string,
  ValidationFunction: (value: string) => boolean
) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [didEdit, setDidEdit] = useState<boolean>(false);

  const isValid = ValidationFunction(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    setDidEdit(false);
  };

  const handleLostFocus = () => {
    setDidEdit(true);
  };

  const reset = () => {
    setValue(defaultValue);
    setDidEdit(false);
  };

  return {
    value,
    handleChange,
    handleLostFocus,
    hasError: didEdit && !isValid,
    reset,
  };
};

export default useInput;

import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import Input from './Input';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';

interface FormFields {
  email: string;
  password: string;
}

interface FormFieldsBoolean {
  email: boolean;
  password: boolean;
}

export default function Login() {
  const [formData, setFormData] = useState<FormFields>({
    email: '',
    password: '',
  });

  const [didEdit, setDidEdit] = useState<FormFieldsBoolean>({
    email: false,
    password: false,
  });

  const emailIsInvalid =
    didEdit.email &&
    !(isEmail(formData.email) && isNotEmpty(formData.password));

  const passwordIsInvalid =
    didEdit.password && !hasMinLength(formData.password, 6);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    setFormData({
      email: '',
      password: '',
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.id]: event.target.value,
    }));

    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [event.target.id]: false,
    }));
  };

  const handleLostFocus = (event: FocusEvent<HTMLInputElement>) => {
    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [event.target.id]: true,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          value={formData?.email}
          onBlur={handleLostFocus}
          onChange={handleChange}
          isInvalid={emailIsInvalid}
          errorValidationMessage="Please enter a valid email address."
        />
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          value={formData?.password}
          onChange={handleChange}
          onBlur={handleLostFocus}
          isInvalid={passwordIsInvalid}
          errorValidationMessage="Please enter a password with 6 or more characters."
        />
      </div>

      <p className="form-actions">
        {/* type="button" make the button not submit the form. default is type="submit" */}
        <button type="button" className="button button-flat">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

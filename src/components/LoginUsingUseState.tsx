import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

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

  const emailIsInvalid = didEdit.email && !formData.email.includes('@');

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
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData?.email}
            onBlur={handleLostFocus}
            onChange={handleChange}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleChange}
          />
        </div>
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

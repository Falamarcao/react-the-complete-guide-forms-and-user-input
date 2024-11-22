import { FormEvent } from 'react';

import Input from './Input';

import useInput from '../hooks/useInput';

import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';

export default function Login() {
  const {
    value: email,
    handleChange: handleEmailChange,
    handleLostFocus: handleEmailLostFocus,
    hasError: emailHasError,
    reset: resetEmail,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: password,
    handleChange: handlePasswordChange,
    handleLostFocus: handlePasswordLostFocus,
    hasError: passwordHasError,
    reset: resetPassword,
  } = useInput('', (value) => hasMinLength(value, 6));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailHasError || passwordHasError) return;

    console.log({ email: email, password: password });

    resetEmail();
    resetPassword();
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
          value={email}
          onBlur={handleEmailLostFocus}
          onChange={handleEmailChange}
          isInvalid={emailHasError}
          errorValidationMessage="Please enter a valid email address."
        />
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordLostFocus}
          isInvalid={passwordHasError}
          errorValidationMessage="Please enter a password with 6 or more characters."
        />
      </div>

      <p className="form-actions">
        {/* type="button" make the button not submit the form. default is type="submit" */}
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../forms/textField";
import { getAuthError, logIn } from "../store/users";
import { validator } from "../utils/validator";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthError());

  const dispatch = useDispatch();

  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(errors).length === 0;
  const validate = () => {
    const errors = validator(data, validationConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validationConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Электронная почта введена некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      min: {
        message: "Пароль должен быть не менее 8 символов",
        value: 8,
      },
    },
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(logIn(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4">Login</h2>
      <TextField
        label="Email"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      {loginError && <p className="text-danger">{loginError.message}</p>}
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-50 mx-auto justify-content-center"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;

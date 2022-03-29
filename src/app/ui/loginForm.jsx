import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "../forms/textField";
import { logIn } from "../store/users";
import { validator } from "../utils/validator";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(errors).length === 0;
  const validate = () => {
    const errors = validator(data, validationConfig);
    console.log(errors);
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
      <h1>Login</h1>
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
      <button type="submit" disabled={!isValid}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;

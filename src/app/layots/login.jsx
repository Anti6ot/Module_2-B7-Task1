import { React, useState, useEffect } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({}); // добавляем пустой объект чтобы избежать ошибки

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState, // РАЗВОРАЧИВАВЕМ СТАРЫЙ ОБЪЕКТ И НИЖЕ УКАЗЫВАЕМ СВОЙСТВА КОТОРЫЕ НУЖНО ИЗМЕНИТЬ!!!
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Некоректная почта"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapital: {
                message: "Пароль должен содержать 1 заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать 1 цифру"
            },
            min: {
                message: "Парол должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    useEffect(() => { // отслеживаем изменения в date и если есть вызываем функцию validate
        validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        };
    };

    const validate = () => { // валидация которая отслеживает ключи/значения в data чтобы не были пустыми
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Button</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

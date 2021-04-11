import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";

// Component
import Input from "../../shared/components/FormElements/Input";

// CSS
import "./Auth.css";

function Auth() {

    const [isLoginMode, setIsLoginMode] = useState(true);
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    password2: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    },
                    password2: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!isLoginMode) {
            setIsLoginMode(prevMode => !prevMode);
        } else {
            history.push("/");
        }
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="GroupLogin">
                <h2 className="GroupLogin-h2">{isLoginMode ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</h2>
                <div className="GroupInput">
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="อีเมล์"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="โปรดใส่อีเมล์ให้ถูกต้อง."
                        onInput={inputHandler}
                        shrink={true}
                        required
                    />
                </div>
                {!isLoginMode && <div className="GroupInput">
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="ชื่อผู้ใช้งาน"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="โปรดใส่ข้อมูล."
                        onInput={inputHandler}
                        shrink={true}
                        required
                    />
                </div>}

                <div className="GroupInput">
                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="รหัสผ่าน"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="โปรดรหัสผ่านอย่างน้อย 6 ตัว."
                        onInput={inputHandler}
                        shrink={true}
                        required
                    />
                </div>

                {!isLoginMode && <div className="GroupInput">
                    <Input
                        id="password2"
                        element="input"
                        type="password"
                        label="ยืนยันรหัสผ่าน"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="โปรดรหัสผ่านอย่างน้อย 6 ตัว."
                        onInput={inputHandler}
                        shrink={true}
                        required
                    />
                </div>}
                <p className="auth-link" onClick={switchModeHandler}>{isLoginMode ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}</p>
                <div>
                    <button type="submit" className="btnSubmit" disabled={!formState.isValid}>{isLoginMode ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</button>
                </div>
            </div>
        </form>
    )
}

export default Auth

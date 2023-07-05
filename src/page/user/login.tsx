import React from 'react';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className='content'>
            <div className='login-wrap'>
                <h1>LOGIN</h1>
                <div className='login-id-wrap'>
                    <h3>ID : </h3>
                    <input type='text' />
                </div>
                <div className='login-pw-wrap'>
                    <h3>PW : </h3>
                    <input type='text' />
                </div>
                <button>SUBMIT</button>
            </div>
        </div>
    )
};
export default Login;
import React, { useContext, useState } from 'react';
import './style/login.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from './context/contextProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function Login() {
    const [login, setlogin] = useState({
        'email': '',
        'pass': ''
    })

    const setData = (e) => {
        const { name, value } = e.target;
        setlogin((newData) => {
            return { ...newData, [name]: value }
        })
    }

    const { setAccount } = useContext(LoginContext);

    const navigate = useNavigate();

    const loginData = async (e) => {
        e.preventDefault();
        const { email, pass } = login;
        try {
            if (email === '') {
                toast.warn("Email Provide 👎!", {
                    position: "top-center"
                });
            } else if (pass === '') {
                toast.warn("Password Provide 👎!", {
                    position: "top-center"
                });
            } else {
                const res = await fetch("http://localhost:8000/login", {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ email, pass })
                });
                const addData = await res.json();

                if (res.status === 422 || !addData) {
                    toast.error("Invalid Details 👎!", {
                        position: "top-center"
                    });
                } else {
                    
                    navigate('/');
                    setAccount(addData);
                }
            }

        } catch (error) {

        }
    }




    return (
        <div className='loginBody'>
            <div className='container mainBox'>
                <div className='row signupRow'>
                    <div className='col-md-4 insideBox-1'>
                        <div style={{ color: "white" }}>
                            <h2>Welcome Back</h2>
                        </div>
                        <div >
                            <TwitterIcon className='twitterIn' fontSize='8rem' />
                        </div>
                    </div>
                    <div className='col-md-8 insideBox-2'>
                        <h2>Login</h2>
                        <input name="email" value={login.email} onChange={setData} placeholder='Email' className='inputBox' />
                        <input name="pass" value={login.pass} onChange={setData} placeholder='Password' className='inputBox' />
                        <button className='loginBtn' onClick={loginData}>Login</button>
                        <span>
                            Dont't have an account?
                            <Link to={'/signup'}>
                                Register here
                            </Link>
                        </span>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login
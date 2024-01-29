import React, { useState } from 'react';
import './style/signup.css';
import { HiOutlineChatAlt } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { url } from './constent';

function Signup() {
    const [signup, setSignup] = useState({
        "name":'',
        "email":'',
        "uname":'',
        "pass":''
    })
    
    const setData = (e)=>{
        const {name,value} = e.target;
        setSignup((newData)=>{
            return{...newData, [name]:value}
        })
    }

    const navigate = useNavigate();

    const signupData = async(e)=>{
        e.preventDefault();
        const {name,email,uname,pass} = signup;
        const res = await fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,uname,pass})
        });
        const addData = await res.json();
        console.log(addData)
        if (res.status === 422 || !addData) {
          window.alert("Plz fill the require field.");
      } else {
          window.alert("Registered successfully.");
          navigate('/login');
      }
    }
    

    return (
        <div className='container mainBox'>
            <div className='row signupRow'>
                <div className='col-md-4 insideBox-1'>
                    <div style={{ color: "white" }}>
                        <h2>Join Us</h2>
                    </div>
                    <div >
                        <HiOutlineChatAlt className='twitterIn' fontSize='8rem' />
                    </div>
                </div>
                <div className='col-md-8 insideBox-2'>
                    <h2>Register</h2>
                    <input value={signup.name} name='name' onChange={setData} placeholder='Name' className='inputBox' />
                    <input value={signup.email} name='email' onChange={setData} placeholder='Email' className='inputBox' />
                    <input value={signup.uname} name='uname' onChange={setData} placeholder='Username' className='inputBox' />
                    <input value={signup.pass} name='pass' onChange={setData} placeholder='Password' className='inputBox' />
                    <button className='loginBtn' onClick={signupData}>Signup</button>
                    <span>
                        Dont't have an account?
                        <Link to={'/login'}>
                            Login here
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Signup
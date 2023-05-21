import React, { useContext } from 'react';
import Feed from './feed';
import './style/home.css';
import Leftbar from './leftbar.js';
import Rightbar from './rightbar.js';
import { LoginContext } from './context/contextProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Home() {

    const { account } = useContext(LoginContext);

    console.log(account);

    if (account) {
        toast.success("Login Successfully Done 😃!", {
            position: "top-center"
        });
    }



    return (
        <>
            {
                account ?
                    ''
                    :
                    <div className='navbarMainBox'>
                        <div>
                            <span className='dontMiss'>Don't miss what's happening</span>
                            <p className='bodyText'>People on Twitter are the first to know.</p>
                        </div>

                        <div style={{ display: "flex", gap: '12px' }}>
                            <Link to={'/login'}>
                                <button className='navbarLogin'>Log in</button>
                            </Link>
                            <Link to={'/signup'}>
                                <button className='navbarSignup'>Sign up</button>
                            </Link>
                        </div>
                    </div>
            }
            <div className='container-fluid'>
                <div className='row main-container-row'>
                    <div className='col-2 col-rightbar'><Leftbar /></div>
                    <div className='col col-feed'><Feed /></div>
                    <div className='col-4 col-leftbar'><Rightbar /></div>
                </div>
                <ToastContainer />
            </div>

        </>
    )
}

export default Home;
import React, { useContext } from 'react';
import './style/leftbar.css';
import img from '../component/img/user1.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { LoginContext } from './context/contextProvider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function Leftbar() {

    //  for achiving logout functionality

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const [open, setOpen] = useState(false);

    const { account, setAccount } = useContext(LoginContext);

    // for logout
    const navigate = useNavigate()

    const logoutuser = async () => {
        const res2 = await fetch("http://localhost:8000/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        // const data2 = await res2.json();
        // console.log(data2);

        if (!res2.status === 201) {
            const error = new Error(res2.error);
            throw error;
        } else {
            setAccount(false);
            // setOpen(false)
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
            navigate("/");
        }
    }

    return (
        <>
            <div className='main-box'>
                <div>
                    <div className='inner-box' style={{ color: 'rgb(29, 155, 240)' }}>
                        <TwitterIcon fontSize='large' />
                    </div>
                </div>
                <Link to={'/'}>
                    <div className='inner-box'>
                        <div><HomeIcon /></div>
                        <div className="inner-box-text">Home</div>
                    </div>
                </Link>
                <div className='inner-box'>
                    <div><TagIcon /></div>
                    <div className="inner-box-text">Explore</div>
                </div>

                {
                    account ?
                        <>

                            <div className='inner-box'>
                                <div><NotificationsIcon /></div>
                                <div className="inner-box-text">Notifications</div>
                            </div>
                            <div className='inner-box'>
                                <div><MailOutlineIcon /></div>
                                <div className="inner-box-text">Messages</div>
                            </div>
                            <div className='inner-box'>
                                <div><BookmarkBorderIcon /></div>
                                <div className="inner-box-text">Bookmarks</div>
                            </div>
                            <div className='inner-box'>
                                <div><ListAltIcon /></div>
                                <div className="inner-box-text">List</div>
                            </div>
                            <Link to={'/profile'}>
                                <div className='inner-box'>
                                    <div><PermIdentityIcon /></div>
                                    <div className="inner-box-text">Profile</div>
                                </div>
                            </Link>
                            <div className='inner-box'>
                                <div><MoreHorizIcon /></div>
                                <div className="inner-box-text">More</div>
                            </div>
                            <button className='rightbar-tweet-btn'>Tweet</button>
                        </>
                        :
                        ''
                }

                {/* code for logout  */}

                {
                    account
                        ?

                        <div className='profileLogout'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <div className='profileMain'>
                                <img src={img} className='profile' alt='user' />
                                <div className='userNamehandle'>
                                    <div>
                                        <div><b>{account.name}</b></div>
                                        <div>@{account.uname}</div>
                                    </div>
                                </div>
                            </div>

                            <div className='logoutOthoption'><MoreHorizIcon /></div>
                        </div>
                        :
                        ""
                }


                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => { handleClose(); logoutuser(); }}>Logout</MenuItem>
                </Menu>
                <ToastContainer />

            </div>



        </>
    )
}

export default Leftbar;
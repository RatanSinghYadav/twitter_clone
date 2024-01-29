import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './style/feed.css';
import img from '../component/img/user1.png';
import ImageIcon from '@mui/icons-material/Image';
import GifBoxIcon from '@mui/icons-material/GifBox';
import PollIcon from '@mui/icons-material/Poll';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import Post from './post';
import { LoginContext } from './context/contextProvider';
import { FaRegComment } from 'react-icons/fa';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaRetweet } from 'react-icons/fa';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FiUpload } from 'react-icons/fi';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';
import { url } from './constent';

function Feed() {
    const [item, setItem] = useState({ 'data': '' })
    const [posts, setPosts] = useState([]);

    const { account } = useContext(LoginContext);
    console.log(account)


    const setData = (e) => {
        const { name, value } = e.target;
        setItem((newData) => {
            return { ...newData, [name]: value }
        })
    }




    // upload an image
    const [image, setImage] = useState({ preview: "", raw: "" });



    const handleChange = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    // for tweet a post 

    const postData = async (e) => {
        e.preventDefault();
        const { data } = item;
        const formData = new FormData();
        formData.append("file", image.raw);
        formData.append("content", data); // Add content to the form data

        const config = {
            Headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const res = await axios.post(`${url}/post`, formData, config);


        setPosts((prevPosts) => [res.data, ...prevPosts]); // Add the new post to the beginning of the posts array

        setItem({ "data": "" });
        setImage({ preview: "", raw: "" });

    };


    const [getPost, setGetpost] = useState([]);

    // all userInfo in the below account variable

    const getData = async () => {
        const res1 = await axios.get(`${url}/getpost`, {
            Headers: {
                "Content-Type": "application/json"
            }
        });
        // console.log(res1.data.getUser);
        setGetpost(res1.data.getUser)
    }


    useEffect(() => {
        getData();
    }, [])




    return (
        <>
            {/* Top Section */}

            <h4 style={{ textAlign: 'left' }}>Home</h4>
            <div className='upper-box'>
                <div className='forYou'>For you</div>
                <div className='following'>Following</div>
            </div>

            {/* Middle Section */}

            <div className='middle-box'>
                <div className='profile-box'>
                    <div ><img src={img} className='profile' alt='user' /></div>
                    <div className='postboxhome' >
                        <input name="data" value={item.data} onChange={setData} placeholder="Whats happening?" className='whats-box' />
                        {image.preview ? (
                            <img src={image.preview} alt="dummy" width="80%" height="80%" />
                        ) : (
                            <></>
                        )}
                    </div>

                </div>
                <div className='icons-box'>
                    <div className='icons-box-1'>
                        <div>
                            <label htmlFor="upload-button">
                                <ImageIcon />
                            </label>
                            <input 
                                type="file"
                                id="upload-button"
                                style={{ cursor: 'pointer', display: 'none' }}
                                onChange={handleChange}
                                alt='image'
                            />
                        </div>
                        <div><GifBoxIcon /></div>
                        <div><PollIcon /></div>
                        <div><SentimentSatisfiedAltIcon /></div>
                        <div><CalendarMonthIcon /></div>
                        <div><PlaceIcon /></div>
                    </div>
                    <div>
                        <button onClick={postData} className='tweet-btn'>Tweet</button>
                    </div>
                </div>
            </div>

            {/* Post Section */}



            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}

            {/* Post Section */}


            {
                getPost.length > 0 ? getPost.map((e, id) => {
                    return (
                        <>
                            <div className='postBox'>
                                <Link to={'/profile'}>
                                    <div className='profileMainDiv'>
                                        <img src={img} className='profile' alt='user' />
                                        <div className='profileData'>
                                            <div><b>{account.name}</b><VerifiedIcon style={{ color: "rgb(29, 155, 240)" }} /></div>
                                            <div><span>@{account.uname}</span></div>
                                            <div>3h</div>
                                        </div>
                                    </div>
                                </Link>
                                <div >
                                    <div className='postData'>
                                        <div><span>{e.content}</span></div>
                                        <div style={{ textAlign: 'center' }}>
                                            {e.media && (
                                                <img className='postImg' src={`${url}/uploads/${e.media}`} alt='post' />
                                            )}</div>

                                    </div>

                                </div>
                                <div className='postOption'>
                                    <div><FaRegComment /></div>
                                    <div><FaRetweet /></div>
                                    <div><FavoriteBorderIcon /></div>
                                    <div><FiUpload /></div>
                                    {
                                        account ? <div><DeleteOutlineIcon /></div> : ''
                                    }
                                </div>
                            </div>
                        </>
                    )
                })
                    : " "
            }


        </>
    )
}

export default Feed;
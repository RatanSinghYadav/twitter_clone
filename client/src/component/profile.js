import React, { useContext, useEffect, useState } from 'react';
import './style/home.css';
import axios from 'axios';
import Leftbar from './leftbar.js';
import Rightbar from './rightbar.js';
import img from '../component/img/user1.png';
import './style/profile.css';
import chair from '../component/img/chair.jpg';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { GrLocation } from 'react-icons/gr';
import { FaRegComment } from 'react-icons/fa';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaRetweet } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { LoginContext } from './context/contextProvider';


function Profile() {
  const [getPost, setGetpost] = useState([]);

  // all userInfo in the below account variable

  const postData = async () => {
    const res1 = await axios.get("http://localhost:8000/getpost", {
      Headers: {
        "Content-Type": "application/json"
      }
    });
    // console.log(res1.data.getUser);
    setGetpost(res1.data.getUser)
  }


  useEffect(() => {
    postData();
  }, [])

  const { account } = useContext(LoginContext);
  console.log(account)

  // upload an image

  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);
    try {
     const res = await axios.post("http://localhost:8000/profilePic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(res)
    } catch (err) {
      console.log(err);
    }
  };
  



  return (
    <>
      <div className='container-fluid'>
        <div className='row main-container-row'>
          <div className='col-2 col-rightbar'><Leftbar /></div>
          <div className='col col-feed'>

            {/* Heading Section */}

            <div className='topHeading'>
              <div><KeyboardBackspaceIcon /></div>
              <div style={{ textAlign: 'left' }}>
                <div><b>{account.name}</b>&ensp; <VerifiedIcon style={{ color: "rgb(29, 155, 240)" }} /></div>
                <div>20K Tweets</div>
              </div>
            </div>

            {/* Profile Picture Section */}

            <div>
              <img src={chair} className='wallImg' alt='background wallpaper' />
              <div style={{ display: 'flex' }} >

              <label htmlFor="upload-button">
                  <img  src={image ? URL.createObjectURL(image) : img} onClick={handleUpload} className='profileImg' alt='user' />
                </label>
                <input
                  type="file"
                  id="upload-button"
                  style={{ cursor: 'pointer', display: 'none' }}
                  onChange={handleChange}
                  alt='image'
                />



                {/*  */}

              </div>
            </div>
            <div className='profilePic'>
              <div></div>
              <div className='profilePicOption'>
                <div className='optionIcon'><MoreHorizIcon /></div>
                <div className='optionIcon'><MailOutlineIcon /></div>
                <div><button className='follow-btn'>Follow</button></div>
              </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <div style={{ textAlign: 'left' }}>
                <div><b>{account.name}</b>&ensp; <VerifiedIcon style={{ color: "rgb(29, 155, 240)" }} /></div>
                <div>@{account.uname}</div>
              </div>
            </div>
            <div className='profileDisc'>
              <span>
                Trends Page of Rebelstar PRABHAS || Upcoming Films SALAAR, Adipurush,
                ProjectK, Spirit || Follow Back Up
                @TrendsRebelStar||
              </span>
            </div>
            <div className='otherInfo'>
              <div><GrLocation />&ensp;India</div>
              <div><CalendarMonthIcon />&ensp;Joined January 2015</div>
            </div>
            <div className='otherInfo'>
              <div><b>156</b> Following</div>
              <div><b>12K</b> Followers</div>
            </div>

            {/* Tweet Options Section */}

            <div className='tweetOptions'>
              <div className='tweetOpt'>Tweets</div>
              <div className='tweetOpt'>Replies</div>
              <div className='tweetOpt'>Media</div>
              <div className='tweetOpt'>Likes</div>
            </div>

            {/* Post Section */}


            {
              getPost.length > 0 ? getPost.map((e, id) => {
                return (
                  <>
                    <div className='postBox'>
                      <div className='profileMainDiv'>
                        <img src={image ? URL.createObjectURL(image) : img} className='profile' alt='user' />
                        <div className='profileData'>
                          <div><b>{account.name}</b><VerifiedIcon style={{ color: "rgb(29, 155, 240)" }} /></div>
                          <div><span>@{account.uname}</span></div>
                          <div>3h</div>
                        </div>
                      </div>
                      <div >

                        <div className='postData'>
                          <div><span>{e.content}</span></div>
                          <div style={{ textAlign: 'center' }}>
                            {e.media && (
                              <img className='postImg' src={`http://localhost:8000/uploads/${e.media}`} alt='post' />
                            )}
                          </div>
                        </div>
                        <div className='postOption'>
                          <div><FaRegComment /></div>
                          <div><FaRetweet /></div>
                          <div><FavoriteBorderIcon /></div>
                          <div><FiShare /></div>
                          <div><DeleteOutlineIcon /></div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })
                : " "
            }



          </div>

          <div className='col-4 col-leftbar'><Rightbar /></div>
        </div>
      </div>
    </>
  )
}

export default Profile
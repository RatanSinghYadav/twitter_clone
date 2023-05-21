import React from 'react';
import './style/rightbar.css';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import time from '../component/img/time.png'
import cnn from '../component/img/cnn.png'
import phone from '../component/img/phone.png'
import apple from '../component/img/apple.png'
import twitter from '../component/img/twitter.png'
import VerifiedIcon from '@mui/icons-material/Verified';

function Rightbar() {
  return (
    <>
      <div className='searchBox'>
        <SearchIcon />
        <input className='search' placeholder='Search Twitter' />
      </div>

      {/* Trends Section */}
      <div className='trendsBar'>
        <div className='box-1'>
          <h3>Trends for you</h3>
          <div style={{ margin: '5px 12px 0px 0px' }}><SettingsIcon /></div>
        </div>
        <div className="box-2">
          <span>Trending in India</span>
          <h5>#Jawan</h5>
          <span>20k Tweets</span>
        </div>
        <div className="box-2">
          <span>Entertainment - Trending</span>
          <h5>#Dunki</h5>
          <span>30k Tweets</span>
        </div>
        <div className="box-2">
          <span>Politics - Trending</span>
          <h5>#Manipur</h5>
          <span>25k Tweets</span>
        </div>
        <div className="box-2">
          <span>Politics - Trending</span>
          <h5>#Manipur</h5>
          <span>25k Tweets</span>
        </div>
        <div className="box-2">
          <span>Politics - Trending</span>
          <h5>#Manipur</h5>
          <span>25k Tweets</span>
        </div>
        <div className='showMore'>Show more</div>
      </div>

      {/* who to follow section */}

      <div className='whoTofollow'>
        <h3>Who to follow</h3>
        <div className='nyTime'>
          <div><img src={time} className='profile' alt='user' /></div>
          <div className='body-text-nyt'>
            <span>The New York Times &ensp; <VerifiedIcon style={{ color: "rgb(29, 155, 240)" }} /></span>
            <span>@nytimes</span>
          </div>
          <div><button className='follow-btn'>Follow</button></div>
        </div>
        <div className='nyTime'>
          <div><img src={cnn} className='profile' alt='user' /></div>
          <div className='body-text'>
            <span>CNN &ensp; <VerifiedIcon style={{ color: "rgb(29, 155, 240)" }} /> </span>
            <span>@CNN</span>
          </div>
          <div><button className='follow-btn'>Follow</button></div>
        </div>
        <div className='nyTime'>
          <div><img src={twitter} className='profile' alt='user' /></div>
          <div className='body-text'>
            <span>Twitter &ensp;<VerifiedIcon style={{ color: "rgb(29, 155, 240)" }} /></span>
            <span>@twitter</span>
          </div>
          <div><button className='follow-btn'>Follow</button></div>
        </div>
        <div className='nyTime'>
          <div><img src={apple} className='profile' alt='user' /></div>
          <div className='body-text'>
            <span>Apple &ensp;<VerifiedIcon style={{ color: "rgb(29, 155, 240)" }} /></span>
            <span>@apple</span>
          </div>
          <div><button className='follow-btn'>Follow</button></div>
        </div>
        <div className='nyTime'>
          <div><img src={phone} className='profile' alt='user' /></div>
          <div className='body-text'>
            <span>PhonePe &ensp;<VerifiedIcon style={{ color: "rgb(29, 155, 240)" }} /></span>
            <span>@phonepe</span>
          </div>
          <div><button className='follow-btn'>Follow</button></div>
        </div>
      </div>
    </>
  )
}

export default Rightbar

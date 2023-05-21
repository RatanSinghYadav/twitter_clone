import React, { useContext } from 'react';
import img from '../component/img/user1.png';
import { FaRegComment } from 'react-icons/fa';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaRetweet } from 'react-icons/fa';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { LoginContext } from './context/contextProvider';
import { FiUpload } from 'react-icons/fi';
import './style/feed.css';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';




function Post({ post }) {
    // const [getPost, setGetpost] = useState([]);

    // // console.log(getPost);

    // // all userInfo in the below account variable
    const { account } = useContext(LoginContext);

    // const postData = async () => {
    //     const res1 = await axios.get("http://localhost:8000/getpost", {
    //         Headers: {
    //             "Content-Type": "application/json"
    //         }
    //     });
    //     // console.log(res1.data.getUser);
    //     setGetpost(res1.data.getUser)
    // }


    // useEffect(() => {
    //     postData();
    // }, [])

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
                        <div><span>{post.content}</span></div>
                        <div style={{ textAlign: 'center' }}>{post.media && (
                            <img className='postImg' src={`http://localhost:8000/uploads/${post.media}`} alt='post' />
                        )}</div>

                    </div>

                </div>
                <div className='postOption'>
                    <div><FaRegComment /></div>
                    <div><FaRetweet /></div>
                    <div><FavoriteBorderIcon /></div>
                    <div><FiUpload /></div>
                    <div><DeleteOutlineIcon /></div>
                </div>
            </div>



        </>
    )
}

export default Post;
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../context/userContext'
import { API } from '../config/api'
import noPhoto from '../images/noPhoto.png'

export default function MyProfile(){
    const [profile, setProfile] = useState({})
    console.log(profile)
    const [state] = useContext(UserContext)
    const path = "http://localhost:5000/uploads/"

    const getProfile = async (e) =>{
        try {
            const response = await API.get(`user/${state.user.id}`)
            setProfile(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getProfile()
    },{profile})
    return(
        <div className="mp">
            <h2 className='mp-title'>My Profile</h2>
            <div className="d-flex">
               {profile.photo === null ? <img src={noPhoto} alt="pp" className="mp-photo" /> : <img src={path + profile.photo} alt="pp" className="mp-photo" />}
               <div>
                   <div>
                       <h5 className="mp-form">FullName</h5>
                       <p className="mp-data">{profile.fullname}</p>
                   </div>
                   <div>
                       <h5 className="mp-form">Email</h5>
                       <p className="mp-data"> {profile.email} </p>
                   </div>
                   <div>
                       <h5 className="mp-form">Phone</h5>
                       {profile.phone === null ? <p className="mp-data" >-</p> :<p className="mp-data" >{profile.phone}</p>}
                   </div>
               </div>
            </div>
        </div>
    )
}
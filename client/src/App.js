import { Routes, Route} from 'react-router-dom'
import LandingPage from './pages/landingPage';
import './styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailFilm from './pages/detailFilm';
import Admin from './pages/admin';
import AddFilm from './pages/addFilm'
import Profile from './pages/profile';
import MyListFilm from './pages/myListFilm';
import { API, setAuthToken } from './config/api';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './context/userContext';

if(localStorage.token){
  setAuthToken(localStorage.token)
}



function App() {
  const Navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)

  useEffect(()=>{
    if(state.user.status === 'admin'){
      Navigate('/admin')
    } else if (state.user.status === ''){
      Navigate('/')
    }
  }, [state])

  const checkUser = async () =>{
    try {
      const response = await API.get('check-auth')

      if(response.status === 404){
        return dispatch({
          type : 'AUTH_ERROR'
        })
      }

      let payload = response.data.data.user

      payload.token = localStorage.token

      dispatch({
        type : 'USER_SUCCES',
        payload
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    checkUser()
  },[])
  return(
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/detailFilm/:id' element={<DetailFilm/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/addFilm' element={<AddFilm/>} />
      <Route path="/listFilm" element={<MyListFilm/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  )
}

export default App;

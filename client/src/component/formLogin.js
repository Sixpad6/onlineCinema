import {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'
import {Alert} from 'react-bootstrap'


export default function Login(){
    const Navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null)

    const[form, setform] = useState({
        email:"",
        password:""
    })

    const { email, password} = form

    const handleChange =(e) =>{
        setform({
            ...form,
            [e.target.name] : e.target.value 
        })
    }

    const handleSubmit = async (e) =>{
        try {
            const config = {
                headers: {
                  'Content-type': 'application/json',
                },
              };

              const body = JSON.stringify(form)

              const response = await API.post('/login', body, config)
              console.log(response)

              if(response?.status === 200){
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data.user,
                  });
              }

              if (response.data.data.user.status=== 'admin') {
                Navigate('/admin')
              } else {
                Navigate('/');
              }

              const alert = (
                <Alert variant="success" className="py-1">
                  Login success
                </Alert>
              );
              setMessage(alert);
              setform({
                email:"",
                password:""
            })
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                  Login failed
                </Alert>
              );
              setMessage(alert);
              setform({
                  email:"",
                  password:""
              })
              console.log(error);
            
        }
    }

    return(
        <form onSubmit={handleSubmit}>
        <h2 style={{color:"#CD2E71"}}>Login</h2>
        {message && message}
            <div style={{marginTop:"20px"}}>
            <input placeholder="Email" name='email' value={email} onChange={handleChange} style={{width:"100%", padding:"5px", borderRadius:"10px", height:"40px"}}/>
            <input placeholder="Password" name='password' value={password} onChange={handleChange} type="password" style={{width:"100%", padding:"5px", borderRadius:"10px", height:"40px", marginTop:"10px"}}/>
            </div>
            <button style={{color:"white", width:"100%", height:"40px", borderRadius:"10px", marginTop:"10px", backgroundColor:"#CD2E71"}}>Login</button>
            <p>Create Your Account  <b>HERE</b> </p>
        </form>
    )
}
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { Alert } from "react-bootstrap"
import { API } from "../config/api"


export default function Register(){
    const Navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null)

    const [form, setForm] = useState({
        email: "",
        password: "",
        fullname: "",
    })

    const {email, password, fullname} = form

    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e)  =>{
        try {
            e.preventDefault();

      // Create Configuration Content-type here ...
      // Content-type: application/json
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Convert form data to string here ...
      const data = {
          ...form,
          status: 'pelanggan'
      }
      const body = JSON.stringify(data);

      // Insert data user to database here ...
      const response = await API.post('/register', body, config);

      console.log(response);
      setForm({
          email : "",
          password : "",
          fullname : ""
      })

      // Notification
      if (response.data.status == 'success') {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
        } catch (error) {
            console.log(error)     
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2 style={{color:"#CD2E71"}}>Register</h2>
            {message && message}
            <div style={{marginTop:"20px"}}>
            <input name="email" value={email} onChange={handleChange} placeholder="Email" style={{width:"100%", padding:"5px", borderRadius:"10px", height:"40px"}}/>
            <input name="password" value={password} onChange={handleChange} placeholder="Password" type="Password" style={{width:"100%", padding:"5px", borderRadius:"10px", height:"40px", marginTop:"10px"}}/>
            <input name="fullname" value={fullname} onChange={handleChange} placeholder="Full Name" style={{width:"100%", padding:"5px", borderRadius:"10px", height:"40px", marginTop:"10px"}}/>
            </div>
            <button style={{color:"white", width:"100%", height:"40px", borderRadius:"10px", marginTop:"10px", backgroundColor:"#CD2E71"}}>Register</button>
            <p>Already Your Account  <b>HERE</b> </p>
        </form>
    )
}
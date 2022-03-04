import pay from '../icons/logopay.png'
import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import { API } from '../config/api'
import { Alert } from 'react-bootstrap'
export default function Payment(film){
    const [message, setMessage] = useState(null)
    const[state] = useContext(UserContext)
    console.log(state)
    const[preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        accountNumber: "",
        transferProof: ""
    })

    const {accountNumber, transferProof} = form


    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })
        if(e.target.type === 'file'){
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const handleSubmit = async (e) =>{
      const falert = (
            <Alert variant="danger" className="py-1">
              Please Login to buy film
            </Alert>
          )
      if(state.isLogin === false){
        return (setMessage(falert))
      }
        try {
            e.preventDefault()

            const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              }

              const formData = new FormData()

              formData.set('transferProof', form.transferProof[0], form.transferProof[0].name)
              formData.set('accountNumber', form.accountNumber)
              formData.set('idFilm', parseInt(film.film.id))
              formData.set('idUser', parseInt(state.user.id))
              formData.set('status', "Pending")
              console.log(form)

              const response = await API.post('/transaction',formData, config)
              console.log (response)
              const alert = (
                <Alert variant="success" className="py-1">
                  thank you for buying this film, please wait 1x24 hours because your transaction is in process
                </Alert>
              );
              setMessage(alert);
              setForm({
                accountNumber: "",
                transferProof: ""
            })

        } catch (error) {
            console.log(error)
            const alert = (
                <Alert variant="danger" className="py-1">
                  Payment failed
                </Alert>
              );
              setMessage(alert);
              setForm({
                accountNumber: "",
                transferProof: ""
              })
        }
    }

    return (
        <form style={{padding:"10px"}} onSubmit={handleSubmit}>
            {message && message}
            <h3 style={{color:"white", textAlign:"center"}}>Cinema <b style={{color:"#CD2E71"}}>Online</b> : 0933933221 </h3>
            <div>
                <h3  style={{color:"white", marginTop:"20px"}}>{film.film.title}</h3>
                <h6 style={{color:"white" , marginTop:"20px"}}>Total : <b style={{color:"#CD2E71"}}>Rp.{film.film.price}</b></h6>
                <input onChange={handleChange} value={accountNumber} name="accountNumber" style={{width:"100%", borderRadius:"10px", padding:"8px", backgroundColor:"black", color:"white", border:"1px solid white"}} placeholder="Input Your Account Number"/>
                <label htmlFor="payment" style={{backgroundColor:"#CD2E71", padding:"10px", color:"white", borderRadius:"10px",  marginTop:"20px", cursor:"pointer"}}>Attach Payment <img src={pay}/> </label>
                <input name="transferProof" value={transferProof} type="file" id="payment" hidden onChange={handleChange}/>
                {preview === null ? (<></>) : (
                <div>
                  <img
                    src={preview}
                    style={{
                      width: '75px',
                      maxHeight: '75px',
                      objectFit: 'cover',
                      marginTop:"10px"
                    }}
                    alt="preview"
                  />
                </div>
              )}
            </div>
            <div>
                <button style={{width:"100%", borderRadius:"10px", padding:"8px", backgroundColor:"#CD2E71", color:"white", marginTop:"25px"}}>PAY</button>
            </div>
        </form>

    )
}
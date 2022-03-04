import { useNavigate } from 'react-router-dom'
import { useState,useEffect, useContext } from 'react'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'
import Payment from './payment'
import { Modal } from 'react-bootstrap'

export default function Landing(){
    const Navigate = useNavigate()
    const [film, setFilm] = useState([])
    const[state] = useContext(UserContext)
    const [showPayment, setShowPayment] = useState(false)

    const getFilm = async (e) =>{
        try {
            const response = await API.get("film")
            setFilm(response.data.getfilm)
            console.log(response)
        } catch (error) {
            
        }
    }
useEffect(()=>{
    getFilm()
},[])    

    const handleDetail = (id) =>{
        Navigate(`/detailFilm/${id}`)
    }
    return(
        <div className="lp"> 
        <h2 className='ms-5 mb-3 mt-2' style={{color:"white"}}>New Film</h2>
            <div className='lp-atas'>
                <div className="c-lp-atas"> 
                <img src={film[0]?.thumbnail} alt="utama" onClick={()=> handleDetail(film[0].id)}/>
                <div className='text'>
                <h2 style={{color:"#CD2E71"}}>{film[0]?.title}</h2>
                <h6 style={{color:"white"}}>{film[0]?.category.name}</h6>
                <p style={{color:"white"}}>{film[0]?.description}</p>
                <div>
                   { state.isLogin === true ? <button style={{color:"white", width:"15%", height:"40px", borderRadius:"10px", marginTop:"10px", backgroundColor:"#CD2E71"}} onClick={()=> setShowPayment(true)}>Buy Now</button> : <></>}
                </div>
                </div>
                </div>
            </div>
            <div className='lp-bawah'>
                <h2 className='ms-5 mb-3' style={{color:"white"}}>List Film</h2>
                <div className='list-item d-flex'>
                        {film.map((item)=>(
                            <div key={item.id} className="me-3" onClick={()=> handleDetail(item.id)} style={{cursor:"pointer"}}>
                                <img src={item.thumbnail} alt="list" width="200px" height="200px" />
                            </div>
                        ))}
                </div>
            </div>
            <Modal
                    size="lg"
                    show={showPayment}
                    onHide={() => setShowPayment(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
          
                    <Modal.Body style={{backgroundColor:"black"}}>
                        <Payment film={film[0]}/>
                    </Modal.Body>
                </Modal>
        </div>
    )
}
import {Media, Player} from 'react-media-player'
import { useEffect, useState, useContext } from 'react'
import { Alert, Modal } from 'react-bootstrap'
import Payment from './payment'
import { useParams } from 'react-router-dom'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'


export default function FilmDetail(){
    const { id } = useParams()
    const[film, setFilm] = useState({})
    const path = "http://localhost:5000/uploads/"
    
    
    const getFilm = async (e)=>{
        try {
            const response = await API.get(`film/${id}`)
            setFilm(response.data.filmId)
            console.log(response)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        getFilm()
    },[])

    const [transaction,setTransaction] = useState({})
    const getTransaction = async(e) =>{
        try {
            const response = await API.get(`filmTransaction/${id}`)
            console.log(response)
            setTransaction(response.data)
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(()=>{
        getTransaction()
    },{transaction})
    
    const [showPayment, setShowPayment] = useState(false)


    return(
        <div className="d-flex df-container">
                <img src={path + film.thumbnail} alt = "Thumbnail" width="300px" height="400px"/>
            <div className='df-right'>
                <div className="container">
                    <div>
                       { <button onClick={()=> setShowPayment(true)}> Buy Now </button>}
                        <h1 style={{color:"white", marginBottom:"20px"}}> {film.title} </h1>
                    </div>
                   {transaction?.transactionId?.status === "Success" ? ( <Media >
                    <div className="media" style={{textAlign:"center"}}>
                    <div className="media-player">
                        <Player src={film.filmUrl} />
                    </div>
                    </div>
                    </Media>):(<Alert variant="danger" className="py-1">
                  Please buy this film to watch
                </Alert>)}
                    <h3 style={{color:"white"}}>{film?.category?.name}</h3>
                    <p style={{color:"#CD2E71", fontWeight:"bold"}}>Rp. {film.price}</p>
                    <p style={{color:"white", marginTop:"20px"}}>{film.description}</p>
                </div>
                <Modal
                    size="lg"
                    show={showPayment}
                    onHide={() => setShowPayment(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
          
                    <Modal.Body style={{backgroundColor:"black"}}>
                        <Payment film={film}/>
                    </Modal.Body>
                </Modal>
            </div>
            </div>
    )
}
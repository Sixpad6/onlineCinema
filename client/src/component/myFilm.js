import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "../config/api"
import { UserContext } from "../context/userContext"


export default function MyFilm(){
    const Navigate = useNavigate()
    const [state] = useContext(UserContext)
    const [film, setFilm] = useState([])
    const path = "http://localhost:5000/uploads/"

    const getFilm = async (e) =>{
        try {
            const response = await API.get(`transaction/${state.user.id}`)
            setFilm(response.data.getTransaction)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDetail = (id) =>{
        Navigate(`/detailFilm/${id}`)
    }

    useEffect(()=>{
        getFilm()
    },[])

    return(
        <div className="con-mf">
            <h2 style={{color:"white", marginBottom:"20px"}}>My List Film</h2>
            <div className="d-flex">
            {film.map((item) =>(
                <div key={item.filmTransaction.id} className='ms-3' onClick={()=> handleDetail(item.filmTransaction.id)}>
                <img src={path + item.filmTransaction.thumbnail} alt="list" width="200px" height="200px"/>
                <h6 className="mf-title">{item.filmTransaction.title}</h6>
                </div>
            ))}
            </div>
        </div>
    )
}
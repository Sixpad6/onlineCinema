import {useState, useContext, useEffect} from 'react'
import { UserContext } from '../context/userContext'
import { API } from '../config/api'


export default function Transaction(){
    const [state] = useContext(UserContext)
    const [transaction, setTransaction] = useState([])
    console.log(transaction)

    const getTransaction = async (e) =>{
        try {
            const response = await API.get(`transaction/${state.user.id}`)
            setTransaction(response.data.getTransaction)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getTransaction()
    },[])

    return (
        <div className='ht-user'>
            <h2 className='ht-title'> History Transaction </h2>
            {transaction.map((item)=>(
                <div className='ht-data' key={item.id}>
                <h5 className='ht-title-film'> {item.filmTransaction.title} </h5>
                <p className='ht-order-film'>{item.orderDate}</p>
                <p className = 'ht-price-film'>Total : Rp. {item.filmTransaction.price}</p>
                <div className='ht-status'>
                <h6 className='ht-data-status'>{item.status}</h6>
                </div>
            </div>
            ))}
            
        </div>
    )
}
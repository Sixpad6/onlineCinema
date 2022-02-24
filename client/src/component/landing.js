import utama from '../images/dedpol.png'
import list1 from '../images/Rectangle3.svg'
import list2 from '../images/Rectangle4.svg'
import list3 from '../images/Rectangle5.svg'
import list4 from '../images/Rectangle6.svg'
import list5 from '../images/Rectangle9.svg'
import list6 from '../images/Rectangle8.svg'
import { useNavigate } from 'react-router-dom'

export default function Landing(){
    const Navigate = useNavigate()
    let ListItem = [
    {
        id: 1,
        url : list1
    },
    {
        id: 2,
        url : list2
    },
    {
        id: 3,
        url : list3
    },
    {
        id: 4,
        url : list4
    },
    {
        id: 5,
        url : list5
    },
    {
        id: 6,
        url : list6
    },
]

    const handleDetail = (id) =>{
        Navigate(`/detailFilm/${id}`)
    }
    return(
        <div className="lp"> 
            <div className='lp-atas'>
                <div className="c-lp-atas">
                <img src={utama} alt="utama"/>
                <div className='text'>
                <h2 style={{color:"red"}}>DEAD POOL</h2>
                <h6 style={{color:"white"}}>Action</h6>
                <p style={{color:"white"}}>Deadpool: Directed by Tim Miller. With Ryan Reynolds, Karan Soni, Ed Skrein, Michael Benyaer. A wisecracking mercenary gets experimented on and becomes</p>
                <div>
                    <button style={{color:"white", width:"15%", height:"40px", borderRadius:"10px", marginTop:"10px", backgroundColor:"#CD2E71"}}>Buy Now</button>
                </div>
                </div>
                </div>
            </div>
            <div className='lp-bawah'>
                <h2 className='ms-5 mb-3' style={{color:"white"}}>List Film</h2>
                <div className='list-item d-flex'>
                        {ListItem.map((item)=>(
                            <div key={item.id} className="me-3" onClick={()=> handleDetail(item.id)}>
                                <img src={item.url} alt="list" />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
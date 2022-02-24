import { Player } from 'react-media-player'
import pay from '../icons/logopay.png'
export default function Payment(){
    return (
        <form style={{padding:"10px"}}>
            <h3 style={{color:"white", textAlign:"center"}}>Cinema <b style={{color:"#CD2E71"}}>Online</b> : 0933933221 </h3>
            <div>
                <h3  style={{color:"white", marginTop:"20px"}}>Tom & Jerry</h3>
                <h6 style={{color:"white" , marginTop:"20px"}}>Total : <b style={{color:"#CD2E71"}}>Rp.156,000</b></h6>
                <input style={{width:"100%", borderRadius:"10px", padding:"8px", backgroundColor:"black", color:"white", border:"1px solid white"}} placeholder="Input Your Account Number"/>
                <label htmlFor="payment" style={{backgroundColor:"#CD2E71", padding:"10px", color:"white", borderRadius:"10px",  marginTop:"20px", cursor:"pointer"}}>Attach Payment <img src={pay}/> </label>
                <input type="file" id="payment" hidden/>
            </div>
            <div>
                <button style={{width:"100%", borderRadius:"10px", padding:"8px", backgroundColor:"#CD2E71", color:"white", marginTop:"25px"}}>PAY</button>
            </div>
        </form>

    )
}
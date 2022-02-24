import {Media, Player} from 'react-media-player'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Payment from './payment'


export default function FilmDetail(){
    
    const [showPayment, setShowPayment] = useState(false)


    return(
            <div className='df-right'>
                <div className="container">
                    <div>
                        <button onClick={()=> setShowPayment(true)}> Buy Now </button>
                        <h1 style={{color:"white", marginBottom:"20px"}}> Tom & Jerry </h1>
                    </div>
                    <Media >
                    <div className="media" style={{textAlign:"center"}}>
                    <div className="media-player">
                        <Player src="http://www.youtube.com/embed/h3YVKTxTOgU" />
                    </div>
                    </div>
                    </Media>
                    <h3 style={{color:"white"}}>Family</h3>
                    <p style={{color:"#CD2E71", fontWeight:"bold"}}>Rp. 156.000</p>
                    <p style={{color:"white", marginTop:"20px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                </div>
                <Modal
                    size="lg"
                    show={showPayment}
                    onHide={() => setShowPayment(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
          
                    <Modal.Body style={{backgroundColor:"black"}}>
                        <Payment/>
                    </Modal.Body>
                </Modal>
            </div>
    )
}
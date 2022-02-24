import {Navbar, Container,Button,Form, Modal, NavDropdown} from 'react-bootstrap'
import logo from '../images/logo.svg'
import { useState, useContext } from 'react'
import Login from './formLogin'
import Register from './formRegister'
import pp from '../images/dedpol.png'
import { UserContext } from '../context/userContext'
import { useNavigate, Link } from 'react-router-dom'

export default function NavbarAdmin(){
    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)
    const[state, dispatch] = useContext(UserContext)

    const Navigate = useNavigate()

    
    const logout = () => {
      console.log(state);
      dispatch({
        type: "LOGOUT",
      });
      Navigate("/");
    };
  
   return(
        <Navbar bg="black" expand="lg">
        <Container>
            <Navbar.Collapse id="navbarScroll">
                <div>
                <img src={logo} alt="logo"/>
                </div>
            </Navbar.Collapse>
            {state.isLogin === true ? (
              <NavDropdown title={<img src={pp} alt="" width="50px" height="50px" style={{borderRadius:"100%"}} />} id="nav-dropdown" style={{backgroundColor:"black", dropdownToggle:"none"}}>
                
              <NavDropdown.Item onClick={()=> Navigate('/addFilm')} >Add film</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            ):(
              <Form className="d-flex ">
                <Button style={{backgroundColor:"black", border:"none"}} onClick={()=> setLogin(true)}>Login</Button>
                <Button style={{backgroundColor:"#CD2E71", border:"none"}} onClick={()=> setRegister(true)} >Register</Button>
            </Form>
            )}
            
        </Container>
        <Modal
        size="sm"
        show={login}
        onHide={() => setLogin(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
          
        <Modal.Body style={{backgroundColor:"black"}}>
            <Login/>
        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={register}
        onHide={() => setRegister(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        
      >
        
        <Modal.Body style={{backgroundColor:"black"}}>
            <Register/>
        </Modal.Body>
      </Modal>
</Navbar>
)
}
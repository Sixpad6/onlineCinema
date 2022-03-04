import {Navbar, Container,Button,Form, Modal, NavDropdown} from 'react-bootstrap'
import logo from '../images/logo.svg'
import { useState, useContext} from 'react'
import logoutbar from '../icons/logout.png'
import MyFilm from '../icons/myfilm.png'
import profilejpg from '../icons/profile.png'
import Login from './formLogin'
import Register from './formRegister'
import noPhoto from '../images/noPhoto.png'
import { UserContext } from '../context/userContext'
import { useNavigate, Link } from 'react-router-dom'


export default function NavbarComponent(){
    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)
    const[state, dispatch] = useContext(UserContext)
    const path = "http://localhost:5000/uploads/"


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
                <Link to='/'>
                <div>
                <img src={logo} alt="logo"/>
                </div>
                </Link>
            </Navbar.Collapse>
            {state.isLogin === true ? (
              <NavDropdown bg="dark" title={state?.photo === undefined ? <img src={noPhoto} alt="pp" width="50px" height="50px" style={{borderRadius:"100%"}}/> : <img src={path + state?.photo} alt="pp" width="50px" height="50px" style={{borderRadius:"100%"}} />} id="nav-dropdown" className="dropdown-toggle">
              <NavDropdown.Item className='menu-bar' onClick={()=> Navigate('/listFilm')}><img src={MyFilm} alt="myfilm" width="25px" height="25px"/> My list item</NavDropdown.Item>
              <NavDropdown.Item className='menu-bar' onClick={()=> Navigate('/profile')} ><img src={profilejpg} alt="profile" width="25px" height="25px"/> My Profile</NavDropdown.Item>
              <NavDropdown.Item className='menu-bar' onClick={logout}><img src={logoutbar} alt="myfilm" width="25px" height="25px"/> Logout</NavDropdown.Item>
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
import { Table, NavDropdown } from "react-bootstrap";
import togle from '../icons/status.png'

export default function TableAdmin(){
    return(
        <Table variant="dark" >
        <thead>
          <tr>
            <th style={{color:"red"}}>No</th>
            <th style={{color:"red"}}>Users</th>
            <th style={{color:"red"}}>Bukti Transfer</th>
            <th style={{color:"red"}}>Film</th>
            <th style={{color:"red"}}>Number Account</th>
            <th style={{color:"red"}}>Status Payment</th>
            <th style={{color:"red"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>wakwaw</td>
            <td>wikwik</td>
            <td>
            <NavDropdown title={<img src={togle} alt="" width="20px" height="20px"/>} id="nav-dropdown" style={{backgroundColor:"black", dropdownToggle:"none"}}>
              <NavDropdown.Item eventKey="4.1" >Approved</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Cancel</NavDropdown.Item>
            </NavDropdown>
            </td>
          </tr>
        </tbody>
      </Table>
    )
}
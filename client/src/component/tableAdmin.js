import { Table, NavDropdown } from "react-bootstrap";
import togle from '../icons/status.png'
import { useState,useEffect } from "react";
import { API } from "../config/api";

export default function TableAdmin(){
  const [transaction, setTransaction] = useState([])
  const path = "http://localhost:5000/uploads/"

  const getTransaction = async(e) =>{
    try {
      const response =  await API.get('transaction')
      setTransaction(response.data.transactions)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (id, value) =>{
    const config = {
      headers: {
        'Content-type': 'application/json',
      }
    }

    let body = {
      status : value
    }

    body = JSON.stringify(body)

    try {
      await API.patch(`transaction/${id}`,body ,config )
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    getTransaction()
  },[transaction])
    return(
      <div className="con-table">
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
          {transaction.map((item)=>(
            <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.userTransaction.fullname}</td>
            <td><img src={path + item.transferProof} alt='bukti' width="40px" height="40px"/></td>
            <td>{item.filmTransaction.title}</td>
            <td>{item.accountNumber}</td>
            {item.status === "Success" ? <td style={{color:"rgb(13, 194, 13)"}}>{item.status}</td> :<td>{item.status}</td>}
            <td>
            <NavDropdown title={<img src={togle} alt="" width="20px" height="20px"/>} id="nav-dropdown" className=".dropdown-toggle" style={{backgroundColor:"black", dropdownToggle:"none"}}>
              <NavDropdown.Item className="menu-trans-approved" onClick={()=> handleSubmit(item.id, "Success")} >Approved</NavDropdown.Item>
              <NavDropdown.Item className="menu-trans-cancel" onClick={()=> handleSubmit(item.id, "Cancel")} >Cancel</NavDropdown.Item>
            </NavDropdown>
            </td>
          </tr>
          ))}
          
        </tbody>
      </Table>
      </div>
    )
}
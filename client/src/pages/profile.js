import MyProfile from "../component/myProfile"
import Transaction from "../component/transaction"
import NavbarComponent from "../component/navbar"

export default function Profile(){
    return(
        <>
        <NavbarComponent/>
        <div className="d-flex">
            <MyProfile/>
            <Transaction/>
        </div>
        </>

    )
}
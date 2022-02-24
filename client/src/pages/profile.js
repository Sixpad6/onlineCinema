import MyProfile from "../component/myProfile"
import Transaction from "../component/transaction"

export default function Profile(){
    return(
        <div className="d-flex">
            <MyProfile/>
            <Transaction/>
        </div>

    )
}
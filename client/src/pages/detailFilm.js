import NavbarComponent from "../component/navbar"
import FilmDetail from "../component/filmDetail"
import sampel from '../images/Rectangle3.svg'

export default function DetailFilm(){
    return (
        <div >
            <NavbarComponent/>
            <div className="d-flex df-container">
                <img src={sampel} alt = "Thumbnail" width="300px" height="400px"/>
                <FilmDetail/>
            </div>

        </div>
    )
}
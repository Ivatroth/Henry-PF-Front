import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


export default function PruebaGoogle() {

    const navigate = useNavigate();

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const token = decodeURIComponent(urlParams.get("token"));
        const email = decodeURIComponent(urlParams.get("email"));
        const username = decodeURIComponent(urlParams.get("username"));
        const tokenExpiration = decodeURIComponent(urlParams.get("tokenExpiration"));
        const roll = decodeURIComponent(urlParams.get("roll"));
        const picture = decodeURIComponent(urlParams.get("picture"));
    

        // Guardar los datos en el localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("tokenExpiration", tokenExpiration);
        localStorage.setItem("roll", roll);
        localStorage.setItem("picture", picture);

        navigate("/")

    },[])

    return (
        <div>
        </div>
    )
}
import React from "react";
// IMPORTAR COMPONENTE DE LOGING

//! METER ESTE COMPONENTE FAV DENTRO DEL COMPONENTE DE PRODUCTOS
export default function Fav ({id}) {

    // const {login, addFav, favs} = componente de Login 
    // const isFaved = favs.some(favId => favId === id)
    const handleClick = () => {
        // if (!login) return Ruta al (/componente de Login)
        alert(id)
    }
    return <button onClick={handleClick}>
        <span aria-label="Fav" role="img">🧡</span>
    </button>
}
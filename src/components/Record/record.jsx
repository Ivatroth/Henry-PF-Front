import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { shoppinghistory } from "../../redux/actions";
import { useNavigate } from "react-router-dom";


export default function History() {
    const dispatch = useDispatch();
    const userData = localStorage.getItem('email')
    const history = useSelector((state) => state.history);
    const handleNavigate = (id) => {
        navigate(`Detail/${id}`);
      }
    useEffect(() => {
        if (userData) {
            dispatch(shoppinghistory(userData));
          }
      }, [dispatch]);



    return (
        <div>
            {
                history? (
                <>
                    {
                        history.map((el)=>el.detailOrders.map((e)=>(
                            <div key={`${el.id}-${e.productId}`} onClick={(e)=>handleNavigate()}>
                                <h3 >{`Item: ${e.product.name}`}</h3>
                                <h2 >{`Precio:$ ${e.purchaseprice}`}</h2>
                                <h2 >{`Status: ${el.status}`}</h2>
                                <h2> {`Fecha de compra: ${el.orderDate}`}</h2>
                                <img src={e.product.img} style={{ width: "200px" }}/>
                                <h1>--------------------------------------------------------------</h1>
                                
                            </div>
                        )))
                    }
                </>
                ): (
                    <h3> Todavia nos realizaste compras </h3>
                )
            }
        </div>
    )


}
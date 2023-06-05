import "./CardList.css";
import cart from "../../assets/cartShop.png";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { setCarrito, aumentarCantidad } from "../../redux/actions";

export default function CardList(props) {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const buyProduct = async (e, props) => {
    e.preventDefault();
    const foundProduct = carrito.find((p) => p.id === props.id);
    if (foundProduct) {
      if (foundProduct.cantidad === props.stock) {
        alert(`No hay mas stock de este producto ${props.title}}`);
      } else {
        dispatch(aumentarCantidad(foundProduct.id));
        toast.success(`Se agrego ${props.title} al carrito`), {};
      }
    } else {
      const newProduct = { ...props, cantidad: 1 };
      dispatch(setCarrito(newProduct));
      toast.success(`Se agrego ${props.title} al carrito`), {};
    }
  };

  return (
      <div data-aos={props.dataAos}>
      <div className="container-cardList" >
        <Link className="link" to={`/detail/${props.id}`}>
      <div className="image-container-card">
        <img className="image" src={props.img} alt={props.description} />
      </div>
        </Link>
      <div className="about-container">
        <div className="title-container">
          <h2>{props.title}</h2>
        </div>
        <div className="category-container">
          <h5 className="category-text">{props.category}</h5>
        </div>
        <div className="description-container">
          <p>{props.description}</p>
        </div>
        <div className="bottom-container ">
          <p className="stock">${props.price}</p>
          <button
            onClick={(e) => buyProduct(e, props)}
            type="button"
            className="button-buy button-list"
          >
            <img src={cart} alt="buy" />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

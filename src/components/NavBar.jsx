import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartToggle } from "../store/slices/cart.slice";
import Cart from "./Cart";

const NavBar = () => {
  const dispatch = useDispatch()
  const toggleCart = useSelector((state) => state.cart)
  const products = useSelector((state) => state.cartProducts)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const logout = () => {
    localStorage.setItem("token", "")
    navigate("/")
  }
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="navbar-flex">
            <div className="navbar-title">
              <button onClick={() => navigate("/")} className="font-title color-white">e-commerce</button>
            </div>
            <div className="navbar-options">
              <div className="navbar-option-flex">
              { token === "" ? <button onClick={() => navigate("/login")}><i className="color-white fa-solid fa-user icon-width"></i></button> : <button onClick={logout}><i class="color-white fa-solid fa-arrow-right-from-bracket icon-width"></i></button>}
              { token !== "" && <button onClick={() => navigate("/purchases")}><i className="color-white fa-solid fa-store icon-width"></i></button> }
              <div className="btn-cart">
                { token !== "" && <button onClick={() => dispatch(cartToggle())}><i className="cart-btn color-white fa-solid fa-cart-shopping icon-width"><span className="counter-product">{products.products?.length}</span></i></button> }
              </div>
              { toggleCart && <Cart/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
export default NavBar;




















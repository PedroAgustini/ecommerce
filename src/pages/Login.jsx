import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    const submit = (e) => {
        localStorage.getItem("token")
        const data = {
            email,
            password
        }
        console.log(data)
        e.preventDefault()
        if([email,password].includes("")) {
            setError("error")
            setTimeout(() => { setError("")},7000)
        } else {
            setEmail("")
            setPassword("")
            axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/users/login`,data)
            .then((res) => {
                localStorage.setItem("token", res.data.data.token)
                setLogin(true)
                setTimeout(() => {
                    navigate("/")
                },4000)
            })
            .catch((error) => {
                if(error.response.status === 404) {
                    setError("data-error")            
                    setTimeout(() => {
                        setError("")
                    },7000)
                }
            })
        }
    }
    return (
        <div className="login">
            <div className="login-container">
                <div className="login-title">
                    <h2 className="title-login">¡Bienvenidos! Ingrese su correo electrónico y contraseña para continuar</h2>
                </div>
                <div className="login-data mt-1rem">
                    <p className="test-data bold">Test data</p>
                    <p><i className="data fa-solid fa-envelope"></i>mason@gmail.com</p>
                    <p><i className="data fa-solid fa-lock"></i>mason1234</p>
                </div>
                <div className="login-form">
                    <form action="" onSubmit={submit}>
                        <div className="form-email">
                            <label htmlFor="login-email">Correo electrónico</label>
                            <br/>
                            <input type="email" className="input-email-login" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-password mt-1rem">
                            <label htmlFor="login-password">Contraseña</label>
                            <br/>
                            <input type="password" className="input-password-login" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-btn mt-1rem">
                            <button type="submit" className="color-white bold btn-login">Login</button>
                        </div>
                    </form>
                    { login && <p className="msj-login">Iniciando seccion</p>}
                    {error === "error" && <p className="msj-error">Datos incorrecto</p>}
                    {error === "data-error" && <p className="msj-error">Datos incorrectos</p>}
                    <p>¿No tienes una cuenta? <button className="bold" onClick={() => navigate("/register")}>Únete</button></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
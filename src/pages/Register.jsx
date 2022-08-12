import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateUser } from '../store/slices/register';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [ready, setReady] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submit = (data) => {
        dispatch(generateUser(data))
        setReady(true)
        setTimeout(() => {
            navigate("/login")
        },4000)
    }
    return (
        <div className="register">
            <div className="register-container">
                <div className="register-title">
                    <h2>Únete</h2>
                </div>
                <div className="register-form">
                    <form action="" onSubmit={handleSubmit(submit)}>
                        <label htmlFor="">Email</label>
                        <input type="email" className="input-email-login" {...register("email",{
                            required: true
                        })}/>
                        {errors.email?.type === "required" && <p className="error-register">Campo requerido</p>}
                        <label htmlFor="">Nombre</label>
                        <input type="text" className="input-email-login" {...register("firstName", {
                            required: true
                        })}/>
                        {errors.firstName?.type === "required" && <p className="error-register">Campo requerido</p>}
                        <label htmlFor="">Apellido</label>
                        <input type="text" className="input-email-login" {...register("lastName",{
                            required: true
                        })}/>
                        {errors.lastName?.type === "required" && <p className="error-register">Campo requerido</p>}
                        <label htmlFor="">Contraseña</label>
                        <input type="password" className="input-email-login" {...register("password",{
                            required: true
                        })}/>
                        {errors.password?.type === "required" && <p className="error-register">Campo requerido</p>}
                        <label htmlFor="">Teléfono</label>
                        <input type="tel" className="input-email-login" {...register("phone",{
                            required: true
                        })}/>
                        {errors.phone?.type === "required" && <p className="error-register">Campo requerido</p>}
                        <button className="color-white bold btn-login">Únete</button>
                    </form>
                    {ready && <p className="msj-login">Te has registrado exitosamente</p>}
                    <p>¿Ya estas registrado? <button className="bold" onClick={() => navigate("/login")}>Log in</button></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
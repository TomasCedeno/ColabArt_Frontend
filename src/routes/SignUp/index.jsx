import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {toast, ToastContainer} from 'react-toastify';

import { useGlobalContext } from '../../context';
import './signup.css'

import bg from '../../assets/signup_bg.jpg'
import { AUTH_URL } from '../../assets/urls';

const SignUp = () => {
    const {user, setUser, logOut} = useGlobalContext();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(()=>{
        logOut()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(
            AUTH_URL+'/user/',
            {...user, lastName: "lastName"},
            {headers:{"Content-Type": "application/json"}}
        )
        .then((result) => {
            const userId = jwt_decode(result.data.access).user_id

            setUser({ ...user, id: userId, token_access: result.data.access, token_refresh: result.data.refresh});
            
            navigate('/home')
        })
        .catch((error) => {
            console.log(error);

            if (error.response.status == 400){
                toast.error("Datos de registro inválidos", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
    }

    return <div className='signUp'>
        <img src={bg} alt="signup_bg" />

        <div className="container">

            <form>
                <input type="text" name="name" id="name" placeholder="Nombre de Usuario" value={user.name} onChange={handleChange} />

                <input type="email" name="email" id="email" placeholder="Email" value={user.email} onChange={handleChange} />

                <input type="password" name="password" id="password" placeholder="Nueva Contraseña" value={user.password} onChange={handleChange} />
                <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Nueva Contraseña" value={user.password2} onChange={handleChange} />

                <button className='btn' onClick={handleSubmit}>Registrarse</button>
            </form>

        </div>

        <ToastContainer />
    </div>
}

export default SignUp;
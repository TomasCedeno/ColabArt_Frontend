import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {toast, ToastContainer} from 'react-toastify'

import { useGlobalContext } from '../../context';
import './login.css'

import bg from '../../assets/login_bg.jpg'
import { AUTH_URL } from '../../assets/urls';

const LogIn = () => {
    const {user, setUser, logOut} = useGlobalContext()
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
            AUTH_URL+'/login/',
            user,
            {headers:{"Content-Type": "application/json"}}
        )
        .then((result) => {
            const userId = jwt_decode(result.data.access).user_id
            setUser({ ...user, id: userId, token_access: result.data.access, token_refresh: result.data.refresh});
            navigate('/home')
        })
        .catch((error) => {
            if (error.response.status == 400 || error.response.status == 401){
                toast.error("Datos de ingreso incorrectos", {
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

    return  <div className='logIn'>
        <img src={bg} alt="login_bg" />

        <div className="container">
            <form>
                <input type="email" name="email" id="email" value={user.email} placeholder="Email" onChange={handleChange}/>

                <input type="password" name="password" id="password" value={user.password} placeholder="Contraseña" onChange={handleChange}/>

                <button className='btn' onClick={handleSubmit}>Iniciar Sesión</button>
            </form>

        </div>

        <ToastContainer />
    </div>
}

export default LogIn;
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context'
import './main.css'

import logo from '../../assets/logo.jpeg'

const Main = () => {
    const {logOut} = useGlobalContext();
    const navigate = useNavigate();

    useEffect(()=>{
        logOut();
    }, [])

    return <div className="main">

        <div className="rectangle">
            <img src={logo} alt="logo" />
        </div>

        <div className="buttons">
            <button className='btn signup' onClick={()=>navigate('/signup')} >Registrarse</button>

            <button className='btn login' onClick={()=>navigate('/login')} >Iniciar Sesión</button>
        </div>

    </div>
}

export default Main;
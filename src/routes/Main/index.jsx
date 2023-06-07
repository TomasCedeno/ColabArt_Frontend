import './main.css'

import logo from '../../assets/logo.jpeg'
import { useNavigate } from 'react-router-dom'

const Main = () => {
    const navigate = useNavigate();

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
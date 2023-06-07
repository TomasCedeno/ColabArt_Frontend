import { useNavigate } from 'react-router-dom'
import './login.css'

import bg from '../../assets/login_bg.jpg'

const LogIn = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return  <div className='logIn'>
        <img src={bg} alt="login_bg" />

        <div className="container">
            <form>
                <input type="email" name="email" id="email" placeholder="Email"/>

                <input type="password" name="password" id="password" placeholder="Contraseña"/>

                <button className='btn' onClick={handleSubmit}>Iniciar Sesión</button>
            </form>

        </div>
    </div>
}

export default LogIn;
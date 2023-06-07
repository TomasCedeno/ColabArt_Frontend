import { useNavigate } from 'react-router-dom'
import './signup.css'

import bg from '../../assets/signup_bg.jpg'

const SignUp = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return <div className='signUp'>
        <img src={bg} alt="signup_bg" />

        <div className="container">

            <form>
                <input type="text" name="name" id="name" placeholder="Nombre de Usuario" />

                <input type="email" name="email" id="email" placeholder="Email"/>

                <input type="password" name="password" id="password" placeholder="Nueva Contraseña"/>
                <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Nueva Contraseña" />

                <button className='btn' onClick={handleSubmit}>Registrarse</button>
            </form>

        </div>
    </div>
}

export default SignUp;
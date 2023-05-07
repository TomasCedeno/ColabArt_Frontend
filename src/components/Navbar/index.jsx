import {Link, useNavigate, useLocation} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return <header>
        <nav className='nav'>
            <ul className='menu'>
                <li>
                    {
                        (location.pathname != '/home')
                        ? <div onClick={() => navigate('/home')} className='btn'>
                            <i className="fi fi-rs-home"></i>
                        </div>
                        : <></>
                    }
                </li>
                <li>
                    <div className='btn'>
                        <i className="fi fi-rr-user"></i>
                    </div>
                    <ul className='submenu'>
                        <li>
                            <Link className='link' to={'/account'} > Cuenta </Link>
                        </li>
                        <li>
                            <Link className='link' to={'/'} > Cerrar Sesión </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
}

export default Navbar;
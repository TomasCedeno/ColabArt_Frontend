import { useEffect } from 'react';
import axios from 'axios';

import { useGlobalContext } from '../../context';
import Navbar from '../../components/Navbar'
import './account.css'

import { AUTH_URL } from '../../assets/urls';

const Account = () => {
    const {user, setUser, getUserData, verifyToken} = useGlobalContext();

    const updateUser = async (newUser) => {
        verifyToken()

        await axios.patch(AUTH_URL+`/user/${ user.id }/`, newUser ,{headers: {'Authorization': `Bearer ${user.token_access}`}})
            .then((result) => {
                setUser({...user, id: result.data.id, name: result.data.name, email: result.data.email})
                alert('Tus datos se han actualizado con éxito.')
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(()=> {
        getUserData();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const newUser = Object.fromEntries(formData)
        const data = {}

        if (newUser.name) data.name = newUser.name
        if (newUser.password) data.password = newUser.password

        updateUser(data)
        
        getUserData()
        e.currentTarget.reset()
    }

    return <div className="account">

        <Navbar />

        <h1>Actualiza Tu Cuenta</h1>

        <div className="form-container">
            <form onSubmit={handleSubmit}>

                <label htmlFor="name" id='lblName'>{user.name}</label>
                <input type="text" name="name" id="name" placeholder="Nombre de Usuario" />

                <label htmlFor="email" id='lblEmail'>{user.email}</label>
                <input type="email" name="email" id="email" placeholder="Email"/>

                <label htmlFor="password" id='lblPassword'>Cambiar Contraseña</label>
                <input type="password" name="password" id="password" placeholder="Nueva Contraseña"/>
                <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Nueva Contraseña" />

                <button id="btnSave" type="submit">Guardar</button>
            </form>
        </div>
    </div>
}

export default Account;
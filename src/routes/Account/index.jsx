import { useState } from 'react';

import Navbar from '../../components/Navbar'
import './account.css'

import {data} from '../../../provisional_data/data'


const Account = () => {
    const [user, setUser] = useState(data)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const newUser = Object.fromEntries(formData)
        
        //TODO: lógica para enviar peticion de update o patch al API de usuarios
        
        alert('Tus datos se han actualizado con éxito.')
        setUser(newUser) //TODO: Cambiar por un fetch del usuario
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
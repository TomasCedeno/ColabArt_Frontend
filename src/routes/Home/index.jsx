import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Drawing from "../../components/Drawing";
import Modal from '../../components/Modal'
import './home.css'

import newImg from '../../assets/new.png'
import joinImg from '../../assets/join.png'

import { drawingsList } from "../../../provisional_data/data";

const Home = () => {
    const [drawings, setDrawings] = useState(drawingsList);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    useEffect(()=>{
        document.body.style.overflow = showCreateModal || showJoinModal ? "hidden" : "auto";
    }, [showCreateModal, showJoinModal])

    const toggleCreateModal = () => {
        setShowCreateModal(!showCreateModal)
    }

    const toggleJoinModal = () => {
        setShowJoinModal(!showJoinModal)
    }

    //TODO: crear funcion para redireccionar a dibujos cuando se haga click, crear y unirse a dibujo

    return <div className="home">
        <Navbar />

        <h2 className="lblDrawings">Tus Dibujos</h2>

        <div className="drawingList">
            <Drawing key={"New Drawing"} name={"Crear Dibujo Nuevo"} img={newImg} onClick={toggleCreateModal} />

            {drawings.map((drawing) => {
                if (drawing.property == 'own')
                    return <Drawing key={drawing.id} name={drawing.name} img={drawing.img} />
            })}
        </div>

        <h2>Dibujos Compartidos</h2>

        <div className="drawingList">
            <Drawing key={"Join Drawing"} name={"Unirse a Dibujo"} img={joinImg} onClick={toggleJoinModal}/>

            {drawings.map((drawing) => {
                if (drawing.property == 'shared')
                    return <Drawing key={drawing.id} name={drawing.name} img={drawing.img} />
            })}
        </div>

        <Modal tittle={"Crear Nuevo Dibujo"} show={showCreateModal} toggle={toggleCreateModal}>
            <h4>Ingresa el nombre de tu nuevo dibujo</h4>
            <input type="text" placeholder="Nuevo Dibujo" />
            <button className="btn">Crear Dibujo</button>
        </Modal>

        <Modal tittle={"Unirse a Dibujo"} show={showJoinModal} toggle={toggleJoinModal}>
            <h4>Ingresa el enlace del dibujo</h4>
            <input type="text" placeholder="Enlace Dibujo" />
            <button className="btn">Unirse a Dibujo</button>
        </Modal>

    </div>
}

export default Home;
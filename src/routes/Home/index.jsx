import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Navbar from "../../components/Navbar";
import Drawing from "../../components/Drawing";
import Modal from '../../components/Modal'
import { useGlobalContext } from '../../context'
import './home.css'

import newImg from '../../assets/new.png'
import joinImg from '../../assets/join.png'

const DRAWINGS_API_URL = 'http://localhost:5000';

const Home = () => {
    const [ownDrawings, setOwnDrawings] = useState([]);
    const [sharedDrawings, setSharedDrawings] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [drawingName, setDrawingName] = useState('');
    const [drawingLink, setDrawingLink] = useState('');
    const navigate = useNavigate();
    const {socket, user, getUserData} = useGlobalContext();

    useEffect(()=>{
        document.body.style.overflow = showCreateModal || showJoinModal ? "hidden" : "auto";
    }, [showCreateModal, showJoinModal])

    useEffect(()=>{
        const fetchOwnDrawings = async () => {            
            return axios.get(DRAWINGS_API_URL+`/rooms/owner/${user.id}`)
                .then((result)=>{
                    setOwnDrawings(result.data)
            })  
        }

        const fetchSharedDrawings = async () => {            
            return axios.get(DRAWINGS_API_URL+`/rooms/collaborator/${user.id}`)
                .then((result)=>{
                    setSharedDrawings(result.data)
            })
        }

        getUserData();
        fetchOwnDrawings();
        fetchSharedDrawings();
    }, [])


    const toggleCreateModal = () => {
        setShowCreateModal(!showCreateModal)
    }

    const toggleJoinModal = () => {
        setShowJoinModal(!showJoinModal)
    }

    const createDrawing = () => {
        const createRoom = async () => {
            const room = {
                name: drawingName,
                ownerId: user.id,
                elements: [],
                collaborators: [],
                img: ""
            }
            
            return axios.post(DRAWINGS_API_URL+'/rooms', room)
                .then((result)=>{
                    navigate(`/room/${result.data.roomId}`)
                })  
        }
        createRoom()
    }

    const joinDrawing = () => {
        const joinRoom = async () => {            
            return axios.get(DRAWINGS_API_URL+`/rooms/exists/${drawingLink}`)
                .then((result)=>{
                    if (result.data.id != undefined) navigate(`/room/${result.data.id}`)
                    else console.log("No existe");
                })  
        }
        joinRoom()
    }

    //TODO: crear funcion para redireccionar a dibujos cuando se haga click, crear y unirse a dibujo

    return <div className="home">
        <Navbar />

        <h2 className="lblDrawings">Tus Dibujos</h2>

        <div className="drawingList">
            <Drawing key={"New Drawing"} name={"Crear Dibujo Nuevo"} img={newImg} onClick={toggleCreateModal} />

            {ownDrawings.map((drawing) => {
                return <Drawing key={drawing.id} name={drawing.name} img={drawing.img} onClick={()=>navigate(`/room/${drawing.id}`)}/>
            })}
        </div>

        <h2>Dibujos Compartidos</h2>

        <div className="drawingList">
            <Drawing key={"Join Drawing"} name={"Unirse a Dibujo"} img={joinImg} onClick={toggleJoinModal}/>

            {sharedDrawings.map((drawing) => {
                return <Drawing key={drawing.id} name={drawing.name} img={drawing.img} onClick={()=>navigate(`/room/${drawing.id}`)}/>
            })}
        </div>

        <Modal tittle={"Crear Nuevo Dibujo"} show={showCreateModal} toggle={toggleCreateModal}>
            <h4>Ingresa el nombre de tu nuevo dibujo</h4>
            <input type="text" placeholder="Nuevo Dibujo" value={drawingName} onChange={(e)=>setDrawingName(e.target.value)}/>
            <button className="btn" onClick={createDrawing}>Crear Dibujo</button>
        </Modal>

        <Modal tittle={"Unirse a Dibujo"} show={showJoinModal} toggle={toggleJoinModal}>
            <h4>Ingresa el enlace del dibujo</h4>
            <input type="text" placeholder="Enlace Dibujo" value={drawingLink} onChange={(e)=>setDrawingLink(e.target.value)} />
            <button className="btn" onClick={joinDrawing}>Unirse a Dibujo</button>
        </Modal>

    </div>
}

export default Home;
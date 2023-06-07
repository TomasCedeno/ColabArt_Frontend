import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';

import Navbar from "../../components/Navbar";
import Canvas from '../../components/Canvas';
import './room.css'

import { DRAWINGS_URL } from '../../assets/urls';

const Room = () => {
    const {roomId} = useParams();
    const canvasRef = useRef(null);
    const ctx = useRef(null);
    const [color, setColor] = useState("#000000");
    const [thickness, setThickness] = useState(5);
    const [tool, setTool] = useState("pencil");
    const [elements, setElements] = useState([]);
    const {socket, user, verifyToken} = useGlobalContext();
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState({});

    useEffect(() => {
        const joinRoom = async () => {            
            return axios.get(DRAWINGS_URL+`/rooms/exists/${roomId}`)
                .then((result)=>{
                    if (result.data.id == undefined) navigate('/home')
                    else {
                        setRoomData(result.data)
                        socket.emit("user-joined", {roomId, userName:user.name, userId:user.id})
                    }
            })  
        }

        verifyToken()
        joinRoom()    
    }, [])

    const saveData = () => {
        socket.emit("save", {img: roomData.img, roomId, elements})
        toast.success("Dibujo guardado con éxito", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const copyShareLink = () => {
        navigator.clipboard.writeText(roomId)
        .then(() => {
            toast.success("Enlace de dibujo copiado al portapapeles", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
        .catch(err => {
            console.error('Error al copiar al portapapeles:', err)
        })
    }

    return <div className="room">
        <Navbar />

        <h2 id='roomName'>{roomData.name}</h2>

        <div className="draw">
            <Canvas 
                canvasRef={canvasRef}
                ctx={ctx}
                color={color}
                thickness={thickness}
                tool = {tool}
                elements={elements}
                setElements={setElements}
                roomData={roomData}
            />
            
            <div className="draw-menu">
                <ul>
                    <li>
                        <div className='btn color' style={{background:color=='#000000'?'beige':color}}>
                            <i className="fi fi-rr-palette"></i>
                            <input type="color" value={color} onChange={(e)=>setColor(e.target.value)}/>
                        </div>
                    </li>

                    <li>
                        <div className='btn tools'>
                            <i className="fi fi-rs-resources"></i>
                            <select name="tool" id="tool" value={tool} onChange={(e)=>setTool(e.target.value)}>
                                <option key="pencil" value="pencil">Lápiz</option>
                                <option key="line" value="line">Línea</option>
                                <option key="rectangle" value="rectangle">Rectángulo</option>
                                <option key="circle" value="circle">Círculo</option>
                            </select>
                        </div>
                    </li>

                    <li className='thick'>
                        <div className='btn'>
                            <i className="fi fi-rr-line-width"></i>
                        </div>
                        <div className="thickness">
                            <label htmlFor="thickness">Grosor: {thickness}</label>
                            <input type="range" min={1} max={20} name='thickness' value={thickness} onChange={(e)=>setThickness(parseInt(e.target.value))}/>
                        </div>
                    </li>

                    <li>
                        <div className='btn erase' 
                            onClick={(e)=>setTool((tool=='eraser'?'pencil':'eraser'))} 
                            style={{background:(tool==='eraser'?'#9a66fe':'beige')}}>
                            <i className="fi fi-rs-eraser"></i>
                        </div>
                    </li>

                    <li>
                        <div className='btn save'
                            onClick={saveData}>
                            <i className="fi fi-rr-disk"></i>
                        </div>
                    </li>

                    <li>
                        <div className='btn share' onClick={copyShareLink}>
                            <i className="fi fi-rs-share"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <ToastContainer />
    </div>
}

export default Room;
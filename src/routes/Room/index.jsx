import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Canvas from '../../components/Canvas';
import './room.css'

const Room = () => {
    const {roomId} = useParams();
    const canvasRef = useRef(null);
    const ctx = useRef(null);

    return <div className="room">
        <Navbar />

        <div className="draw">
            <Canvas 
                canvasRef={canvasRef}
                ctx={ctx}
            />
            
            <div className="draw-menu">
                <ul>
                    <li>
                        <div className='btn color'>
                            <i className="fi fi-rr-palette"></i>
                            <input type="color" />
                        </div>
                    </li>

                    <li>
                        <div className='btn tools'>
                            <i className="fi fi-rs-resources"></i>
                            <select name="tool" id="tool">
                                <option value="pencil">Lápiz</option>
                                <option value="rectangle">Rectángulo</option>
                                <option value="circle">Círculo</option>
                            </select>
                        </div>
                    </li>

                    <li className='thick'>
                        <div className='btn'>
                            <i className="fi fi-rr-line-width"></i>
                        </div>
                        <div className="thickness">
                            <label htmlFor="thickness">Grosor: {5}</label>
                            <input type="range" min={1} max={20} name='thickness' />
                        </div>
                    </li>

                    <li>
                        <div className='btn erase'>
                            <i className="fi fi-rs-eraser"></i>
                        </div>
                    </li>

                    <li>
                        <div className='btn share'>
                            <i className="fi fi-rs-share"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default Room;
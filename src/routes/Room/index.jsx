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

        <Canvas 
            canvasRef={canvasRef}
            ctx={ctx}
        />
    </div>
}

export default Room;
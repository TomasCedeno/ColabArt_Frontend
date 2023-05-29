import { useParams } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Canvas from '../../components/Canvas';
import './room.css'

const Room = () => {
    const {roomId} = useParams();

    return <div className="room">
        <Navbar />

        <Canvas></Canvas>
    </div>
}

export default Room;
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Drawing from "../../components/Drawing";
import './home.css'

import newImg from '../../assets/new.png'
import joinImg from '../../assets/join.png'

import { drawingsList } from "../../../provisional_data/data";

const Home = () => {
    const [drawings, setDrawings] = useState(drawingsList);

    //TODO: crear funcion para redireccionar a dibujos cuando se haga click, crear y unirse a dibujo

    return <div className="home">
        <Navbar />

        <h2 className="lblDrawings">Tus Dibujos</h2>

        <div className="drawingList">
            <Drawing key={"New Drawing"} name={"Crear Dibujo Nuevo"} img={newImg}/>

            {drawings.map((drawing) => {
                if (drawing.property == 'own')
                    return <Drawing key={drawing.id} name={drawing.name} img={drawing.img} />
            })}
        </div>

        <h2>Dibujos Compartidos</h2>

        <div className="drawingList">
            <Drawing key={"Join Drawing"} name={"Unirse a Dibujo"} img={joinImg}/>

            {drawings.map((drawing) => {
                if (drawing.property == 'shared')
                    return <Drawing key={drawing.id} name={drawing.name} img={drawing.img} />
            })}
        </div>

    </div>
}

export default Home;
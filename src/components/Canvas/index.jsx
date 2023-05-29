import { useRef } from 'react';
import { useState } from 'react';
import './canvas.css'

const Canvas = () => {
    const canvas = useRef();
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);

    const onMouseDown = (e) => {
        canvas.current.getContext("2d").moveTo(x, y);
        setMouseDown(true);
    };
      
    const onMouseUp = (e) => {
        setMouseDown(false);
    };
      
    const onMouseMove = (e) => {
        setX(e.clientX)
        setY(e.clientY)

        if (mouseDown) {
            canvas.current.getContext("2d").lineTo(x, y);
            canvas.current.getContext("2d").stroke();
        }
    };

    return <canvas id="canvas"
        ref={canvas}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}>      
        </canvas>
}

export default Canvas;
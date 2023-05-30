import { useEffect } from 'react';
import { useState } from 'react';
import './canvas.css'

const Canvas = ({canvasRef, ctx}) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = window.innerHeight * 2;
        canvas.width = window.innerWidth * 2;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.style.width = `${window.innerWidth}px`;
        const context = canvas.getContext("2d");

        context.strokeWidth = 5;
        context.scale(2, 2)
        context.lineCap = "round";
        context.strokeStyle = "#000";
        context.lineWidth = 5;
        ctx.current = context;
    }, [])

    const onMouseDown = (e) => {
        ctx.current.moveTo(x, y);
        setMouseDown(true);
    };
      
    const onMouseUp = (e) => {
        setMouseDown(false);
    };
      
    const onMouseMove = (e) => {
        setX(e.clientX)
        setY(e.clientY)

        if (mouseDown) {
            ctx.current.lineTo(x, y);
            ctx.current.stroke();
        }
    };

    return <div class="canvas-container"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}>
        <canvas ref={canvasRef} />
    </div>
}

export default Canvas;
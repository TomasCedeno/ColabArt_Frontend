import { useEffect, useState, useLayoutEffect } from 'react';
import rough from "roughjs/bundled/rough.esm";
import './canvas.css'

const generator = rough.generator();

const Canvas = ({canvasRef, ctx, color, tool, thickness, elements, setElements}) => {
    const [isDrawing, setIsDrawing] = useState(false);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = window.innerHeight ;
        canvas.width = window.innerWidth;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.style.width = `${window.innerWidth}px`;
        const context = canvas.getContext("2d");

        context.strokeWidth = 5;
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = thickness;
        ctx.current = context;
    }, [])

    useEffect(() => {
        ctx.current.strokeStyle = color;
    }, [color]);

    useEffect(() => {
        ctx.current.lineWidth = thickness;
    }, [thickness]);


    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current);

        if (elements.length > 0) {
            ctx.current.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
        }

        elements.forEach((ele, i) => {
            if (ele.element === "rect") {
                roughCanvas.draw(
                    generator.rectangle(ele.offsetX, ele.offsetY, ele.width, ele.height, {
                        stroke: ele.stroke,
                        roughness: 0,
                        strokeWidth: ele.thickness,
                    })
                );

            } else if (ele.element === "line") {
                roughCanvas.draw(
                    generator.line(ele.offsetX, ele.offsetY, ele.width, ele.height, {
                        stroke: ele.stroke,
                        roughness: 0,
                        strokeWidth: ele.thickness,
                    })
                );

            } else if (ele.element === "pencil") {
                roughCanvas.linearPath(ele.path, {
                    stroke: ele.stroke,
                    roughness: 0,
                    strokeWidth: ele.thickness,
                });

            } else if (ele.element === "eraser") {
                roughCanvas.linearPath(ele.path, {
                    stroke: "#fff",
                    roughness: 0,
                    strokeWidth: ele.thickness,
                });
            }
        });

        const canvasImage = canvasRef.current.toDataURL();
        //socket.emit("drawing", canvasImage);
    }, [elements]);


    const onMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        if (tool === "pencil" || tool === "eraser") {
            setElements((prevElements) => [
                ...prevElements,
                {
                offsetX,
                offsetY,
                path: [[offsetX, offsetY]],
                stroke: color,
                element: tool,
                thickness,
                },
            ]);

        } else {
            setElements((prevElements) => [
                ...prevElements,
                { offsetX, offsetY, stroke: color, element: tool, thickness },
            ]);
        }

        setIsDrawing(true);
    };
        
    const onMouseMove = (e) => {
        if (!isDrawing) {
            return;
        }

        const { offsetX, offsetY } = e.nativeEvent;
              
        if (tool === "rect") {
            setElements((prevElements) =>
              prevElements.map((ele, index) =>
                index === elements.length - 1
                  ? {
                      offsetX: ele.offsetX,
                      offsetY: ele.offsetY,
                      width: offsetX - ele.offsetX,
                      height: offsetY - ele.offsetY,
                      stroke: ele.stroke,
                      element: ele.element,
                      thickness: ele.thickness,
                    }
                  : ele
              )
            );

        } else if (tool === "line") {
            setElements((prevElements) =>
              prevElements.map((ele, index) =>
                index === elements.length - 1
                  ? {
                      offsetX: ele.offsetX,
                      offsetY: ele.offsetY,
                      width: offsetX,
                      height: offsetY,
                      stroke: ele.stroke,
                      element: ele.element,
                      thickness: ele.thickness,
                    }
                  : ele
              )
            );

        } else if (tool === "pencil" || tool === "eraser") {
            setElements((prevElements) =>
              prevElements.map((ele, index) =>
                index === elements.length - 1
                  ? {
                      offsetX: ele.offsetX,
                      offsetY: ele.offsetY,
                      path: [...ele.path, [offsetX, offsetY]],
                      stroke: ele.stroke,
                      element: ele.element,
                      thickness: ele.thickness,
                    }
                  : ele
              )
            );
        }
    };

    const onMouseUp = (e) => {
        setIsDrawing(false);
    };


    return <div className="canvas-container"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}>
        <canvas ref={canvasRef} />
    </div>
}

export default Canvas;
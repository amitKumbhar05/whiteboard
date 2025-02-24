import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client"
const Canvas = (props) => {
  const canvasref = useRef(null)
  const contextRef = useRef(null);
  const socketRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ offsetX: 0, offsetY: 0 });
  const { id } = useParams();
  // const draw = (ctx, frameCount) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  //   ctx.fillStyle = '#000000'
  //   ctx.beginPath()
  //   // ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
  //   // ctx.moveTo(1000, 3000)
  //   // ctx.lineTo(1000, 3000)
  //   // ctx.stroke()
  //   // ctx.fill()
  // }

  useEffect(() => {
    socketRef.current = io('https://whiteboard-backend-c4ys.onrender.com')
    // socketRef.current = io('http://localhost:5000')
    const canvas = canvasref.current
    const context = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;//important
    socketRef.current.emit("join-room", id);
    // let frameCount = 0
    // let animationFrameId

    // const render = () => {
    //   frameCount++
    //   draw(context, frameCount)
    //   animationFrameId = window.requestAnimationFrame(render)
    // }
    // render()
    // // draw(context)
    // return () => {
    //   window.cancelAnimationFrame(animationFrameId)
    // }

    socketRef.current.on("canvas-state", (data) => {
      if (data) {
        console.log(data);
        const img = new Image();
        img.src = data;
        img.onload = () => contextRef.current.drawImage(img, 0, 0);
      }
    });

    socketRef.current.on('draw', ({ startX, startY, endX, endY }) => {
      drawLine(contextRef.current, startX, startY, endX, endY);
    });

    // socket.on('clear', () => {
    //   contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    // });
    return () => {
      socketRef.current.disconnect();
    };
  }, [id])

  const drawLine = (context, startX, startY, endX, endY) => {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setLastPosition({ offsetX, offsetY });
  };
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    const dataURL = canvasref.current.toDataURL();
    socketRef.current.emit('canvas-state', { roomId: id, data: dataURL });
  };
  const drr = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    drawLine(contextRef.current, lastPosition.offsetX, lastPosition.offsetY, offsetX, offsetY);
    setLastPosition({ offsetX, offsetY });
    socketRef.current.emit('draw', {
      roomId: id,
      data: {
        startX: lastPosition.offsetX,
        startY: lastPosition.offsetY,
        endX: offsetX,
        endY: offsetY,
      }
    });
  };

  return <canvas
    onMouseDown={startDrawing}
    onMouseOut={finishDrawing}
    onMouseUp={finishDrawing}
    onMouseMove={drr}
    ref={canvasref} {...props} />

}

export default Canvas
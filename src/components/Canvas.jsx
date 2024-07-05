import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client"
const Canvas = (props) => {
  const socket = io('http://localhost:5000')
  const canvasref = useRef(null)
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    // ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
    // ctx.moveTo(1000, 3000)
    // ctx.lineTo(1000, 3000)
    // ctx.stroke()
    // ctx.fill()
  }

  useEffect(() => {
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
    socket.on('draw', ({ offsetX, offsetY }) => {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    });

    socket.on('clear', () => {
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    });
    // }
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const drr = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    socket.emit('draw', { offsetX, offsetY });
  };

  return <canvas
    onMouseDown={startDrawing}
    onMouseUp={finishDrawing}
    onMouseMove={drr}
    ref={canvasref} {...props} />

}

export default Canvas
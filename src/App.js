import {useEffect, useRef, useState} from 'react';
import './App.css';
import SpiralAnalysis from './spiralAnalysis';

function App() {
    const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);
    const [canvasCTX, setCanvasCTX] = useState(null);
    const [isDrawn, setIsDrawn] = useState(0);
    const [vals,setVals] = useState([])
    //const [canvasSize,setCanvasSize] = useState()
    const [canvasSide, setCanvasSide] = useState()
    const color = "#000000"
    const size = 4
    let new_data = []
    function drawBackground() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      //const side = Math.min(window.innerWidth,window.innerHeight)/2
      //setCanvasSize(side)
      //canvas.width = side;
      //canvas.height = side;
      setCanvasSide(Math.min(window.innerWidth,window.innerHeight)/2)
      canvas.width = canvasSide
      canvas.height = canvasSide
      setCanvasCTX(ctx);
      ctx.moveTo(canvasSide/2,canvasSide/2)

      for (let i=0; i< 210; i++) {
        let angle = 0.1 * i; 
        let x=(5+10*angle)*Math.cos(angle);
        let y=(5+10*angle)*Math.sin(angle);
        ctx.lineTo(x + canvasSide/2, y + canvasSide/2);
        ctx.stroke()
      }
      return
    }

    useEffect(()=>{
      drawBackground()

    },[canvasRef, canvasSide]);


    
    const SetPos = (e) =>{
      setMouseData({
          x: e.clientX,
          y: e.clientY
        });
      };
    
    const Draw = (e) =>{
      if (e.buttons !== 1 || isDrawn === 1) return;
      const ctx = canvasCTX
      ctx.beginPath();
      ctx.moveTo(mouseData.x, mouseData.y)
      //setVals((oldvals)=>[...oldvals, [mouseData.x,mouseData.y]])
      setVals((oldvals)=>oldvals.concat([[mouseData.x,mouseData.y]]))
      setMouseData({
        x: e.clientX,
        y: e.clientY
      });
      ctx.lineTo(e.clientX,e.clientY)
      ctx.strokeStyle = color;
      ctx.lineWidth  =size;
      ctx.lineCap = "round";
      
      ctx.stroke();
      
    }

  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
    console.log(vals)
  };

  // const createNewVals = ()=>{
  //   for (let point of vals){
  //     new_data.push([point[0]-canvasSide,point[1]-canvasSide])
  //   }
  // }
    return (
      <div>
      <div>
      <canvas style = {{borderStyle: 'dotted'}}
      ref = {canvasRef}
      onMouseEnter = {(e) =>SetPos(e)}
      onMouseMove = {(e)=> {SetPos(e);Draw(e)}}
      onMouseUp = {(e)=> setIsDrawn(1)}
      ></canvas>
        <div
                className="controlpanel"
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%", 
                }}
            >
      <button onClick = {()=> {
        const ctx = canvasCTX;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setIsDrawn(0)
        setVals([])
        drawBackground()
      }}>Clear</button>
      
      <button onClick={handleButtonClick}>Score</button>
      {showComponent && <SpiralAnalysis data = {vals} center = {[canvasSide/2,canvasSide/2]}/>}

      
      </div></div></div>
    );
    
    

    }

  


export default App;

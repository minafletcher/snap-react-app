export default function Landing({setShapes}) {
    
    const clearCanvas = () => {

      setShapes(prev => [])
    }
    
    return <>
    <h1 class="text-3xl">
    Click anywhere to create!
  </h1>
  <button class="absolute z-10 left-0 ml-10 p-2.5 border-2 rounded-lg cursor-pointer" onClick={clearCanvas}>Clear Canvas</button>
  </>
}
type ModalProps={
  score:number;
  highScore:number;
  handleRestartClick:()=>void
}

export default function Modal({score, highScore, handleRestartClick}:ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="fixed inset-0 transition-opacity">
        <div className="fixed inset-x-0 top-[30%] border max-w-xs md:max-w-xl m-auto glass-card p-2">
          <h2>CONGRATULATIONS!</h2>
          <div>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
          </div>
          <div>
            <button className=" border
      w-[200px]
      m-auto 
      bg-cyan-200 
      hover:cursor-pointer
      hover:shadow-md
      hover:w-[250px]
      shadow-cyan-200
      glass-button
      transition-all" onClick={()=>{handleRestartClick()}}>RETRY!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

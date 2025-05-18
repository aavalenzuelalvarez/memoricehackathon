
type ModalProps={
  score:number;
  highScore:number;
}

export default function Modal({score, highScore}:ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 transition-opacity">
        <div className="fixed inset-x-0 top-[30%] border max-w-3xl m-auto bg-blue-100 rounded">
          <h2>CONGRATULATIONS!</h2>
          <div>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
          </div>
          <div>
            <button>Retry</button>
          </div>
        </div>
      </div>
    </div>
  )
}

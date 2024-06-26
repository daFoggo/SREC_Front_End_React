import { useNavigate } from "react-router-dom"

const Forbidden = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate("/")
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center font-spaceGrotesk gap-5">
        <div className="flex flex-col items-center">
          <h1 className="text-8xl font-bold text-primary900">403</h1>
          <h1 className="text-4xl font-bold">Forbidden</h1>
          <p className="text-2xl font-bold">You don&apos;t have permission to access this page.</p>
        </div>
        <button className="bg-primary500 px-5 py-3 rounded-xl text-white font-bold hover:bg-primary600" onClick={goBack}>Go back to home</button>
      </div>
    </div>
  )
}

export default Forbidden
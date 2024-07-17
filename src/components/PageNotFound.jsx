import { useNavigate } from "react-router-dom"
import routes from "../routes/routeConfig"

const Forbidden = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(routes.home)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center font-spaceGrotesk gap-5">
        <div className="flex flex-col items-center">
          <h1 className="text-8xl font-bold text-primary900">404</h1>
          <h1 className="text-4xl font-bold">Page Not Found</h1>
          <p className="text-2xl font-bold">Looks like you are lost, remember to bring a map next time.</p>
        </div>
        <button className="bg-primary500 px-5 py-3 rounded-xl text-white font-bold hover:bg-primary600" onClick={goBack}>Go back to home</button>
      </div>
    </div>
  )
}

export default Forbidden
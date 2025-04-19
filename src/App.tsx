import { useEffect} from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { useActivity } from "./hooks/useActivity"

function App() {
  const { state, dispatch} = useActivity()
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp : boolean = state.activities.length > 0;

    return (
      <>
        <header className="bg-slate-300 py-3">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <img className="w-60" src="/logo.svg" alt="Logo" />

            <h1 className="text-center text-lg font-bold text-blue-600 uppercase">
              Contador de calorias
            </h1>

            <button 
              className='bg-white text-blue-600 p-2 font-bold uppercase cursor-pointer rounded-lg text-sm disabled:opacity-20'
              disabled={!canRestartApp}
              onClick={() => dispatch({type:'reset-app'})}
            >
              Reiniciar App
            </button>
            
          </div>
        </header>

        <section className="bg-blue-500 py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <Form/>
          </div>
        </section>

        <section
          className="bg-slate-300 py-10"
        >
          <div className="max-w-4xl mx-auto">
            <CalorieTracker/>
          </div>
        </section>

        <section className="p-10 mx-auto max-w-4xl">
          <ActivityList/>
        </section>

        <footer className="bg-blue-600 p-4 text-center">
          <p className="text-2xl text-white">&copy; {currentYear} <a className="font-black" href="https://jordydev.website/" target="blank" rel="noopener noreferrer">JordyDev</a> | Todos los derechos reservados</p>
      </footer>
      </>
    )
}

export default App

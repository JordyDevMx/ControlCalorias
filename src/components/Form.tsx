import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid" // npm i uuid npm i --save-dev @types/uuid para agregar id unicos
import { Activity } from "../types"
import { categories } from "../data/categories"
import { useActivity } from "../hooks/useActivity"

const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form() {
    const {state, dispatch} = useActivity()

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId) {
            const  selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])
    
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | 
    ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({
            type: 'save-activity', 
            payload: {
                newActivity: {
                    ...activity,
                    calories: parseInt(activity.calories.toString())
                }
            }
        })

        // reiniciar despues de guardar la actividad
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form 
            className="space-y-5 bg-white shadow-md p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select 
                    className="bg-gray-200 border-b-2  focus:outline-none focus:border-blue-700 w-full px-4 py-2 rounded-lg"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option 
                            value={category.id}
                            key={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    className="bg-gray-200 border-b-2  focus:outline-none focus:border-blue-700 w-full px-4 py-2 rounded-lg"
                    placeholder="Ej. Comida: Tacos, Ensalada, Jugos; Ejercicio: Correr, Pesas, Cuerda"
                    type="text"
                    id="name"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input
                    className="bg-gray-200 border-b-2  focus:outline-none focus:border-blue-700 w-full px-4 py-2 rounded-lg"
                    placeholder="Ej. 200, 300"
                    type="number"
                    id="calories"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 w-full p-2 font-bold uppercase text-white rounded-lg cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}

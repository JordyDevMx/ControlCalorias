import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline" // iconos npm i @heroicons/react
import { useActivity } from "../hooks/useActivity"

export default function ActivityList() {
    const {state, dispatch, isEmptyActivities, categoryName} = useActivity()
    
    return (
        <>
            <h2 className="text-4xl font-bold text-slate-900 text-center">
                Comida y Actividades
            </h2>

            {isEmptyActivities ? <p className="text-center mt-6"> No hay actividades aún...</p> :
                state.activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">

                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10  py-2 text-white uppercase font-bold shadow-xl ${activity.category === 1 ? 'bg-orange-600' : 'bg-blue-500'}`}>
                            {categoryName(+activity.category)}
                        </p>
                        <p className="text-2xl font-bold pt-5">{activity.name}</p>
                        <p className={`font-black text-4xl ${activity.category === 1 ? 'text-orange-600' : 'text-blue-500'}`}>
                            {activity.calories} {''}
                            <span>
                                Calorias
                            </span>
                        </p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <button
                            onClick={() => dispatch({type: "set-activeId", payload: {id: activity.id}})}
                        >
                            <PencilSquareIcon
                                className="h-8 w-8 text-gray-800"
                            />
                        </button>

                        <button
                            onClick={() => dispatch({type: "delete-activity", payload: {id: activity.id}})}
                        >
                            <TrashIcon
                                className="h-8 w-8 text-red-600"
                            />
                        </button>
                    </div>

                </div>
            ))}
        </>
    )
}
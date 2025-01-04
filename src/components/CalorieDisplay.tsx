type CalorieDisplayProps = {
    calories: number
    text: string
    color: string
}

export default function CalorieDisplay({calories, text, color} : CalorieDisplayProps) {
    return (
        <p className="text-gray-500 font-bold rounded-full grid grid-cols-1 gap-3 text-center text-2xl">
            <span className={`font-black text-6xl ${color}`}>{calories}</span>
            {text}
        </p>
    )
}

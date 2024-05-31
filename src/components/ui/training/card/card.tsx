export default function TrainingCard ({name, exercices}: {name: string, exercices: string}) {
  return (
    <div className="bg-white p-4 border rounded-2 flex flex-col gap-y-3 shadow">
      <h3 className="text-5 font-semibold">{name}</h3>
      <p className="text-4 text-justify">{exercices}</p>
    </div>
  )
}
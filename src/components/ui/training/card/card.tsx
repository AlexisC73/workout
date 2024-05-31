import { DotsIcon } from "@/assets/icons";

export default function TrainingCard ({name, exercices}: {name: string, exercices: string}) {
  return (
    <div className="bg-white p-4 border rounded-2 flex flex-col gap-y-3 shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-5 font-semibold hover:text-blue-6 cursor-pointer">{name}</h3>
        <DotsIcon className="text-8 cursor-pointer" />
      </div>
      <p className="text-4 text-justify">{exercices}</p>
    </div>
  )
}
import {ExerciseItemOptions} from "./options/exercises-item-options";

export function ExerciseListItem () {
  return (
    <li className="flex items-center gap-x-6 h-14">
      <img src="https://via.placeholder.com/80" alt="Développer couché" className="h-full" />
      <h2 className="text-5 flex-1">Développer couché</h2>
      <div>
        <ExerciseItemOptions />
      </div>
    </li>
  )
}
import { DeleteIcon, DotsIcon, EditIcon } from "@/assets/icons"
import DropdownMenu from "@/components/ui/dropdown/dropdown"
import DropdownMenuItem from "@/components/ui/dropdown/item/DropdownMenuItem"
import { useState } from "react"
import { Link } from "react-router-dom"

export function ExerciseItemOptions () {
  const [showOptions, setShowOptions] = useState(false)
  const toggleOptions = () => setShowOptions(prev => !prev)

  return (
    <>
      <div className="relative">
        <div onClick={toggleOptions} className="w-12 h-12 flex justify-center items-center cursor-pointer lg:hidden">
          <DotsIcon className="rotate-90" />
        </div>
        <div className="hidden lg:flex gap-x-3">
          <Link to={"exercises/{id}/edit"} className="w-8 h-8 text-5 flex items-center justify-center"><EditIcon /></Link>
          <button className="w-8 h-8 text-5 text-red-6"><DeleteIcon /></button>
        </div>
        {showOptions && <div className="absolute top-10 right-5 w-50 z-50">
          <DropdownMenu>
            <DropdownMenuItem type="link" to="exercises/{id}/edit">
              <EditIcon className="text-5" />
              <span>Modifier</span>
            </DropdownMenuItem>
            <DropdownMenuItem type="button" onClick={() => console.log("click")}>
              <DeleteIcon className="text-5 text-red-6" />
              <span className="text-red-6">Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenu>
        </div>}
      </div>
    </>
  )
}
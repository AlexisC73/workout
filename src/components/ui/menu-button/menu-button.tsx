import { useState } from "react"

//TODO: Change the logic of the menu for a context
export default function MenuButton({onClickAction}: {onClickAction: () => void}) {
  const [active, setActive] = useState(false)
  const defaultClasses = "w-7 h-0.5 bg-black absolute left-1"
  const toggleActive = () => setActive(!active)

  const handleOnClick = () => {
    onClickAction()
    toggleActive()
  }
  return (
    <button onClick={handleOnClick} className="w-9 h-9 relative">
      <div className={`${defaultClasses} top-2.5 ${active ? "scale-x-0" : ""}`}></div>
      <div className={`${defaultClasses} top-4.25 ${active ? "rotate-40" : ""}`}></div>
      <div className={`${defaultClasses} top-4.25 ${active ? "-rotate-40": ""}`}></div>
      <div className={`${defaultClasses} bottom-2.5 ${active ? "scale-x-0" : ""}`}></div>
    </button>
  )
}
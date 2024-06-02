export default function Input ({type, name}: {type: string, name: string}) {
  return (
    <input type={type} name={name} id={name} className="border rounded-2 p-3 w-full" />
  )
}
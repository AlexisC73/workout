import { SearchIcon } from "@/assets/icons";

export default function SearchBar () {
  return (
    <div className="bg-blue-1 flex px-5 py-3 items-center rounded-2">
      <input type="text" className="bg-transparent flex-1 outline-none placeholder-text-gray-5" placeholder="Recherchez votre éxercice" />
      <SearchIcon className="text-6" />
    </div>
  )
}
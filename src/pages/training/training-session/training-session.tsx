import { DotsIcon } from "@/assets/icons"
import SearchBar from "@/components/ui/searchbar/searchbar"
import Layout from "@/layout"

export default function TrainingSessionPage () {
  return (
    <Layout.WithHeader>
      <div className="flex flex-1">
        <div className="w-100 px-8 pt-10 border-r hidden lg:block">
          <div>
            <SearchBar />
          </div>
        </div>
        <div className="px-8 flex-1 pt-8 max-w-245 mx-auto">
          <div className="lg:hidden">
            <SearchBar />
          </div>
          <div className="flex items-center justify-between pt-5 lg:pt-0">
            <h1 className="text-8">Votre séance</h1>
            <DotsIcon className="text-7" />
          </div>
        </div>
      </div>
    </Layout.WithHeader>
  )
}
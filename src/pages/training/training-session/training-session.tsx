import { DotsIcon, NotesEmptySVG } from "@/assets/icons"
import SearchBar from "@/components/ui/searchbar/searchbar"
import Layout from "@/layout"

export default function TrainingSessionPage () {
  return (
    <Layout.WithHeader>
      <div className="flex flex-1">
        <div id="left-col" className="w-100 px-8 pt-10 border-r hidden lg:block">
          <div>
            <SearchBar />
          </div>
        </div>
        <div id="right-col" className="px-8 flex flex-col flex-1 pt-8 max-w-245 mx-auto">
          <div className="lg:hidden">
            <SearchBar />
          </div>
          <div className="flex items-center justify-between pt-5 lg:pt-0">
            <h1 className="text-8">Votre séance</h1>
            <DotsIcon className="text-7" />
          </div>
          <div id="exercices" className="flex flex-col gap-y-10 flex-1">
            <EmptyTrainingSession />
          </div>
        </div>
      </div>
    </Layout.WithHeader>
  )
}

function EmptyTrainingSession () {
  return (
    <div className="flex flex-1 mt-20 lg:mt-0 items-center lg:justify-center flex-col gap-y-10 lg:gap-y-20">
      <NotesEmptySVG className="text-50 lg:text-70" />
      <p className="font-medium">Votre séance est vide, recherchez un éxercice afin de l’ajouter.</p>
    </div>
  )
}
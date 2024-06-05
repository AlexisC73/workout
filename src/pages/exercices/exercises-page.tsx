import Button from "@/components/ui/button/button";
import { ExercisesList } from "@/components/ui/exercises/list/list";
import { ExerciseListItem } from "@/components/ui/exercises/list/item/exercises-list-item";
import Layout from "@/layout";
import { Link } from "react-router-dom";

export default function ExercisesPage () {
  return (
    <Layout.WithHeader>
      <section id="exercises" className="w-full flex flex-col p-8 gap-y-4 lg:max-w-260 mx-auto">
        <h1 className="text-8">Liste des éxercices</h1>
        <Link to={"/exercises/new"} className="py-2"><Button>+ Ajouter un exercice</Button></Link>
        <ExercisesList>
          <ExerciseListItem />
          <ExerciseListItem />
          <ExerciseListItem />
          <ExerciseListItem />
          <ExerciseListItem />
        </ExercisesList>
      </section>
    </Layout.WithHeader>
  )
}

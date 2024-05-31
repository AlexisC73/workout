import Button from "@/components/ui/button/button";
import TrainingCard from "@/components/ui/training/card/card";
import Layout from "@/layout";

export default function TrainingPage() {
  return (
    <Layout.WithHeader>
      <section className="px-8 mt-10 lg:px-0 lg:max-w-245 mx-auto">
        <h1 className="text-8 w-55 line-height-8 mt-10 font-bold">Prêt pour votre séance ?</h1>
        <div className="w-full mt-10">
          <Button>Démarrer une séance personnalisé</Button>
        </div>
        <h2 className="text-5 font-medium mt-10">Mes séances personnalisé</h2>
        <ul className="grid grid-cols-1 gap-y-5 gap-x-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
          <li><TrainingCard name="Haut du corp" exercices="Presse à cuisse, dévelloper couché, Soulevé de terre, fentes bulgare, Squat à la barre" /></li>
        </ul>
      </section>
    </Layout.WithHeader>
  )
}


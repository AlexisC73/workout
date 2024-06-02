import Button from "@/components/ui/button/button";
import Input from "@/components/ui/form/input/input";
import Label from "@/components/ui/form/label/label";
import Separator from "@/components/ui/separator/separator";
import Layout from "@/layout";
import { useRef, useState } from "react";
import ImageCropper from "../../components/ui/crop/crop";
import useChangeAvatar from "@/hooks/useChangeAvatar";

export default function ProfilePage () {
  const avatarInputRef = useRef<HTMLInputElement | null>(null)
  const {avatar, changeAvatar, onCropCompleted} = useChangeAvatar({el: avatarInputRef})
  const [cropedImage, setCroppedImage] = useState<string | null>(null)

  const handleCropCompleted = onCropCompleted((avatarUrl: string) => {
      setCroppedImage(avatarUrl)
    })

  return (
    <Layout.WithHeader>
      {avatar && <ImageCropper expectSize={{width: 200, height: 200}} onCropCompleted={handleCropCompleted} imageSource={avatar} />}
      <div className="max-w-245 mx-auto w-full flex flex-col pb-10">
        <section id="profile-picture" className="p-8 flex flex-col items-center gap-y-10">
          <input ref={avatarInputRef} type="file" className="hidden" id="avatar" accept="image/*" />
          <h2 className="self-start font-bold text-6">Avatar</h2>
          <img src={cropedImage || "https://placehold.co/75x75"} className="rounded-full w-25 h-25" />
          <div className="flex flex-col gap-y-5 w-full lg:flex-row lg:gap-x-5">
            <Button onCickAction={changeAvatar}>Modifier mon avatar</Button>
            <Button style="secondary">Supprimer mon avatar</Button>
          </div>
        </section>
        <Separator />
        <section id="account-information" className="p-8 flex flex-col items-center gap-y-10 mt-10">
          <div className="w-full">
            <h2 className="self-start font-bold text-6 mb-4">Informations générales</h2>
            <form className="w-full flex flex-col gap-y-5 lg:grid lg:grid-cols-2 lg-gap-x-5">
              <div>
                <Label htmlFor="email">Adresse E-mail</Label>
                <Input name="email" type="email" />
              </div>
              <div className="mt-5 grid-row-start-2">
                <Button type="submit">Mettre à jour mes informations</Button>
              </div>
            </form>
          </div>
          <div className="w-full mt-10">
            <h2 className="self-start font-bold text-6 mb-4">Sécurité</h2>
            <form className="w-full flex flex-col gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
              <div>
                <Label htmlFor="old-password">Ancien mot de passe</Label>
                <Input name="old-password" type="password" />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input name="password" type="password" />
              </div>
              <div>
                <Label htmlFor="password-confirmation">Confirmez votre mot de passe</Label>
                <Input name="-confirmation" type="password" />
              </div>
              <div className="mt-5 lg:grid-row-start-3">
                <Button type="submit">Mettre à jour mon mot de passe</Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </Layout.WithHeader>
  )
}
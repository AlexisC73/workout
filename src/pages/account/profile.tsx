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
          <div className="flex flex-col gap-y-5 w-full">
            <Button onCickAction={changeAvatar}>Modifier mon avatar</Button>
            <Button style="secondary">Supprimer mon avatar</Button>
          </div>
        </section>
        <Separator />
        <section id="password-update" className="p-8 flex flex-col items-center gap-y-10">
          <h2 className="self-start font-bold text-6">Informations générales</h2>
          <form className="w-full flex flex-col gap-y-5">
            <div>
              <Label htmlFor="email">Adresse E-mail</Label>
              <Input name="email" type="email" />
            </div>
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
            <div className="mt-5">
              <Button type="submit">Mettre à jour mes informations</Button>
            </div>
          </form>
        </section>
      </div>
    </Layout.WithHeader>
  )
}
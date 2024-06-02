import { MutableRefObject, useCallback, useEffect, useState } from "react"

export default function useChangeAvatar({el}: {el: MutableRefObject<HTMLInputElement | null>}) {

  const [avatar, setAvatar] = useState<string | null>(null)

  const changeAvatar = () => {
    if(!el.current) return
    el.current.click()
  }

  const handleFileChange = useCallback(() => {
    if(!el.current?.files) return
    const reader = new FileReader()
    reader.onload = () => {
      setAvatar(reader.result as string)
    }
    reader.readAsDataURL(el.current.files[0])
  }, [el])

  const onCropCompleted = (cb: (avatarUrl: string) => void) => (imageUrl: string) => {
    setAvatar(null)
    cb(imageUrl)
  }

  useEffect(() => {
    if(!el.current) return
    const input = el.current
    input.addEventListener("change", handleFileChange)
    return () => {
      input.removeEventListener("change", handleFileChange)
    }
  }, [el, handleFileChange])

  return {avatar, changeAvatar, onCropCompleted}
}
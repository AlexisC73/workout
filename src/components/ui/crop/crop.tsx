import { useState, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ imageSource, onCropCompleted, expectSize }: {imageSource: string, onCropCompleted: (imageUrl: string) => void, expectSize: {width: number, height: number}}) => {
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageCrop = () => {
    if (imgRef.current && crop) {
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const targetWidth = expectSize.width;
      const targetHeight = expectSize.height;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const croppedWidth = crop.width * scaleX;
      const croppedHeight = crop.height * scaleY;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      ctx?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        croppedWidth,
        croppedHeight,
        0,
        0,
        targetWidth,
        targetHeight
      );

      const croppedImageData = canvas.toDataURL('image/jpeg');
      onCropCompleted(croppedImageData);
    }
  };

  return (
    <div className='absolute inset-0 bg-black flex items-center justify-center flex-col gap-y-10'>
      <ReactCrop crop={crop} aspect={1} onChange={c => setCrop(c)}>
        <img src={imageSource} ref={imgRef} />
      </ReactCrop>
      <button onClick={handleImageCrop} className='text-white font-bold px-12 py-3 bg-blue-6 rounded-2'>Valider</button>
    </div>
  );
};

export default ImageCropper
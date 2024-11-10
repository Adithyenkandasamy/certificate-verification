import Image from 'next/image'

interface LightboxProps {
  image: string
  onClose: () => void
}

export default function Lightbox({ image, onClose }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-4xl max-h-4xl">
        <Image
          src={image}
          alt="Lightbox image"
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-300 transform scale-95 hover:scale-100"
        />
      </div>
    </div>
  )
}
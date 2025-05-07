import { useState } from "react";

interface Props {
  images: string[];
}

export const GridImages = ({ images }: Props) => {
  const [activeImage, setactiveImage] = useState(images[0]);

  const handleImageClick = (image: string) => {
    setactiveImage(image);
  };
  return (
    <div className="flex-1 flex flex-col gap-3 relative">
      <div className="bg-[#f2f2f2] h-[500px] p-4">
        <img
          src={activeImage}
          alt="Imagen de Producto"
          className="h-full w-full object-contain"
        />
      </div>

      {/*miniaturas */}
      <div className=" flex mt-4 gap-2">
        {images.map((image, index) => (
          <button
            className={`w-16 h-16 p-1 border ${
              activeImage === image ? "border-black" : "border-transparent"
            }rounded-lg hover:border-black focus:outline-none`}
            key={index}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

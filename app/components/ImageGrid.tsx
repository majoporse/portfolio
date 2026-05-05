interface ImageGridProps {
  images: string[];
  altPrefix: string;
}

const ImageGrid = ({ images, altPrefix }: ImageGridProps) => {
  if (!images || images.length === 0) return null;

  return (
    /* 
   Using CSS columns for a CSS-only masonry layout. 
   It defaults to 1 column on mobile, and 2 on medium screens. 
  */
    <div className="columns-1 md:columns-2 gap-6 w-full">
        {" "}
      {images.map((imageSrc, index) => (
        <div key={index} className="break-inside-avoid mb-6">
              {" "}
          <img
            src={imageSrc}
            alt={`${altPrefix} project screenshot ${index + 1}`}
            className="w-full h-auto rounded-2xl theme-border-medium border object-cover bg-gray-50 dark:bg-gray-900"
            loading="lazy"
          />
             {" "}
        </div>
      ))}
       {" "}
    </div>
  );
};

export default ImageGrid;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductImage } from "./Product";

function Slider({ images, className }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      if (currentSlide >= images.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide((prev) => prev + 1);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, images.length]);

  const renderSlides = images.map((slide) => (
    <div
      key={slide.id}
      className={`p-4 lg:p-6 flex justify-evenly gap-3 items-center bg-white/50 ${className}`}
      style={{ width: 100 / images.length + "%" }}
    >
      <div>
        <h3 className="font-medium text-[4vw] md:text-3xl lg:text-4xl text-slate-700 mb-3 md:mb-6">
          Grab Upto
          <span className="px-2 font-bold text-red-800 drop-shadow text-[1.125em]">
            50%
          </span>
          Off <span className="block">On Selected Products</span>
        </h3>
        <Link
          to={"/"}
          className="inline-block px-4 py-2 text-xs rounded-md lg:rounded-lg lg:text-sm lg:px-6 lg:py-2.5 btn-primary"
        >
          Buy Now
        </Link>
      </div>

      <div className="w-1/3 overflow-hidden rounded-lg sm:w-1/4">
        <ProductImage
          className="aspect-square"
          url={slide.attributes.url}
          alt={"slider image"}
        />
      </div>
    </div>
  ));

  return (
    <div
      className="flex transition duration-1000"
      style={{
        width: images.length * 100 + "%",
        transform: `translateX(-${currentSlide * (100 / images.length)}%)`,
      }}
    >
      {renderSlides}
    </div>
  );
}
export default Slider;

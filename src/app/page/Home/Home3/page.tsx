// components/DualFeatureSection.tsx
import Image from "next/image";

const features = [
  {
    title: "Mountain trails guide",
    buttonText: "See more",
    bgColor: "  ",
    imgUrl: "https://i.pinimg.com/736x/b4/4e/9d/b44e9df14f6935cba3203ecc23586920.jpg", // person with map
  },
  {
    title: "Best places in the city",
    buttonText: "See more",
    bgColor: "",
    imgUrl: "https://admin.expatica.com/jp/wp-content/uploads/sites/18/2023/11/tokyo-skyline-fuji.jpg", // cathedral
  },
];

const DualFeatureSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {features.map((item, index) => (
        <div
          key={index}
          className={`${item.bgColor} relative rounded-xl overflow-hidden flex items-center justify-center h-80 md:h-96`}
        >
          {/* Text Content */}
          <div className="absolute z-10 left-6 top-6 text-white">
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <button className="px-4 py-2 bg-white text-gray-800 rounded shadow hover:bg-gray-100">
              {item.buttonText}
            </button>
          </div>

          {/* Background or Feature Image */}
          <Image
            src={item.imgUrl}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ))}
    </section>
  );
};

export default DualFeatureSection;

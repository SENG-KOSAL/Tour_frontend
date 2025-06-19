// components/VeniceSection.tsx
import Image from "next/image";

const VeniceSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-start gap-8 p-6 md:p-12 bg-white">
      {/* Left Text Section */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">Go to Venice</h2>
        <p className="text-gray-700">
          Venice, or Venezia, is a distinguished 1,700-year-old city that was at
          the nexus of major European art, music, and political developments. It
          was an origin of the Renaissance and is thought to have been the
          world’s first financial center.
        </p>
      </div>

      {/* Right Images Section */}
      <div className="md:w-1/2 grid grid-cols-3 gap-4">
        {[
          {
            src: "https://wallpapercave.com/wp/wp9766139.jpg",
            alt: "Gondola Ride",
          },
          {
            src: "https://w0.peakpx.com/wallpaper/273/1001/HD-wallpaper-30k-japanese-temple-blue-temple.jpg",
            alt: "Colorful Buildings",
          },
          {
            src: "https://i.pinimg.com/736x/de/16/80/de168050653953dec25486308e474253.jpg",
            alt: "Woman in Venice",
          },
        ].map((img, i) => (
          <div
            key={i}
            className="relative h-64 w-full rounded-lg overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute bottom-0 bg-blue-500 bg-opacity-80 text-white text-sm p-2 w-full text-center">
              $805.50/person
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VeniceSection;

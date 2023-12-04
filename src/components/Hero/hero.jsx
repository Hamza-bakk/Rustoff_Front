import BG from '/src/assets/plaine_2.png';
import { IoIosMail } from "react-icons/io";

const Hero = () => {
  return (
    <>
      <div
        className="bg-cover bg-center h-[800px] flex items-center"
        style={{
          backgroundImage: `url(${BG})`,
        }}
      >
        <div className="container mx-auto flex flex-col items-center py-12 sm:py-24 h-full">
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
            <h1 className="text-4xl text-black font-bold leading-tight sm:text-5xl">
              RustOff Graphisme 
              <span className="text-black"> & </span> 
              <span className="text-violet-400">3D</span>
            </h1>
            <p className="px-8 text-black text-center font-extrabold mt-8 mb-12 text-lg">
              Bienvenue chez RustOff, Graphiste et design 3D. Vous retrouverez ma boutique et vous pouvez me contacter pour plus d'informations.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <a href="mailto:rustgraph@gmail.com" className="text-white flex no-underline items-center px-8 py-3 m-2 text-lg font-semibold rounded bg-gray-800 border-gray-900 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-900 hover:text-violet-500">
              <IoIosMail className="mr-2" /> Contact
            </a>
            <button className="block px-8 py-3 m-2 text-lg font-semibold rounded bg-violet-400 text-gray-900 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-violet-500 hover:text-gray-100">
              <i className="fa-solid fa-file-invoice-dollar mr-2"></i> Devis
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

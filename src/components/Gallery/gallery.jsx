
import image1 from '../../assets/images/3d/IMG_0100.jpg';
import image2 from '../../assets/images/autres/IMG_0059.jpg';
import image3 from '../../assets/images/illustrations/forest.png';
import image4 from '../../assets/images/collab/casque.jpg';
import image5 from '../../assets/images/pokemon/magi.jpg';
import image6 from '../../assets/images/tattoo/fond_tatoo_pivoine.jpg';
import image7 from '../../assets/images/autres/IMG_0069.jpg';
import image8 from '../../assets/images/avatars/hfhg.png';
import image9 from '../../assets/images/pokemon/img_2.jpg';
import image10 from '../../assets/images/illustrations/bird.png';
import image11 from '../../assets/images/tattoo/tatoo_cerise.png';
import image12 from '../../assets/images/twitch/sala.jpg';

const Gallery = () => {
  const images = [
    image1, image2, image3, image4, image5, image6,
    image7, image8, image9, image10, image11, image12
  ];

  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
      <section className="container mx-auto flex items-center justify-center mt-20 mb-10">
        <h1 className="text-4xl font-bold p-4 border-4 border-gray-500 rounded inline-block">
          Quelques exemples de mes réalisations :
        </h1>
      </section>
      <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={images[0]} />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={images[1]} />
          </div>
          <div className="w-full p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={images[9]} />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={images[7]} />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={images[4]} />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={images[5]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

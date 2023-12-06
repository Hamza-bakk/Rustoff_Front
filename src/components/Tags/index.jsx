import React, { useState } from 'react';

import IMG_0100 from '../../assets/images/3d/IMG_0100.jpg';
import IMG_0113 from '../../assets/images/3d/IMG_0113.jpg';
import IMG_0123 from '../../assets/images/3d/IMG_0123.jpg';
import IMG_0126 from '../../assets/images/3d/IMG_0126.jpg';
import IMG_0127 from '../../assets/images/3d/IMG_0127.jpg';
import IMG_0146 from '../../assets/images/3d/IMG_0146.jpg';
import IMG_0151 from '../../assets/images/3d/IMG_0151.jpg';
import IMG_01111 from '../../assets/images/3d/IMG_01111.jpg';
import hfhg from '../../assets/images/avatars/hfhg.png';
import img_22 from '../../assets/images/avatars/img_22.jpg';
import img_23 from '../../assets/images/avatars/img_23.jpg';
import img_24 from '../../assets/images/avatars/img_24.jpg';
import img_25 from '../../assets/images/avatars/img_25.jpg';
import img_26 from '../../assets/images/avatars/img_26.jpg';
import img_27 from '../../assets/images/avatars/img_27.jpg';
import img_30 from '../../assets/images/collab/3.jpg';
import casque from '../../assets/images/collab/casque.jpg';
import mexique from '../../assets/images/collab/mexique.jpg';
import arbre from '../../assets/images/illustrations/arbre.png';
import bird from '../../assets/images/illustrations/bird.png';
import canyon from '../../assets/images/illustrations/canyon.png';
import desert from '../../assets/images/illustrations/desert.png';
import forest from '../../assets/images/illustrations/forest.png';
import IMG_0071 from '../../assets/images/illustrations/IMG_0071.jpg';
import jap from '../../assets/images/illustrations/jap.png';
import nuit_noir from '../../assets/images/illustrations/nuit_noir.png';
import plaine from '../../assets/images/illustrations/plaine.png';
import hellistra1 from '../../assets/images/logo/hellistra1.jpg';
import malife2 from '../../assets/images/logo/malife2.jpg';
import malife3 from '../../assets/images/logo/malife3.jpg';
import evo from '../../assets/images/pokemon/evo.jpg';
import img_1 from '../../assets/images/pokemon/img_1.jpg';
import img_2 from '../../assets/images/pokemon/img_2.jpg';
import img_3 from '../../assets/images/pokemon/img_3.jpg';
import img_9 from '../../assets/images/pokemon/img_9.jpg';
import img_10 from '../../assets/images/pokemon/img_10.jpg';
import magi from '../../assets/images/pokemon/magi.jpg';
import Mew_two_neon from '../../assets/images/pokemon/Mew_two_neon.jpg';
import poke from '../../assets/images/pokemon/poke_unite.jpg';
import fond_tatoo_pivoine from '../../assets/images/tattoo/fond_tatoo_pivoine.jpg';
import tatoo_cerise from '../../assets/images/tattoo/tatoo_cerise.png';
import tatoo from '../../assets/images/tattoo/tatoo.png';
import img_6 from '../../assets/images/twitch/img_6.jpg';
import img_8 from '../../assets/images/twitch/img_8.jpg';
import img_11 from '../../assets/images/twitch/img_11.jpg';
import img_13 from '../../assets/images/twitch/img_13.jpg';
import img_14 from '../../assets/images/twitch/img_14.jpg';
import img_15 from '../../assets/images/twitch/img_15.jpg';
import img_19 from '../../assets/images/twitch/img_19.jpg';
import sala from '../../assets/images/twitch/sala.jpg';
import IMG_0057 from '../../assets/images/autres/IMG_0057.jpg';
import IMG_0059 from '../../assets/images/autres/IMG_0059.jpg';
import IMG_0068 from '../../assets/images/autres/IMG_0068.jpg';
import IMG_0069 from '../../assets/images/autres/IMG_0069.jpg';
import la3d_1 from '../../assets/images/3d_1.jpg';
import canyon2 from '../../assets/images/canyon.png';
import dash from '../../assets/images/dash.png';
import desert2 from '../../assets/images/desert.png';
import hero from '../../assets/images/hero.png';
import image4 from '../../assets/images/image4.png';
import image5 from '../../assets/images/image5.png';
import image6 from '../../assets/images/image6.jpg';
import img_12 from '../../assets/images/img_12.jpg';
import IMG_01462 from '../../assets/images/IMG_0146.jpg';
import rust from '../../assets/images/rust.png';
import rusty from '../../assets/images/rusty.png';
import tatoo_dragon from '../../assets/images/tatoo_dragon.png';



const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleLinkClick = (category) => {
    setSelectedCategory(category);
  };

  const imagesByCategory = {
    '3d': [IMG_0100, IMG_0113, IMG_0123, IMG_0126, IMG_0127, IMG_0146, IMG_0151, IMG_01111],
    'avatars': [hfhg, img_22, img_23, img_24, img_25, img_26, img_27], 
    'collab': [img_30, casque, mexique],
    'illustrations': [arbre, bird, canyon, desert, forest, IMG_0071, jap, nuit_noir, plaine],
    'logo': [hellistra1, malife2, malife3],
    'pokemon': [evo, img_1, img_2, img_3, img_9, img_10, magi, Mew_two_neon, poke],
    'tattoo': [fond_tatoo_pivoine, tatoo_cerise, tatoo],
    'twitch': [img_6, img_8, img_11, img_13, img_14, img_15, img_19, sala],
    'autres': [IMG_0057, IMG_0059, IMG_0068, IMG_0069, la3d_1, canyon2, dash, desert2, hero, image4, image5, image6, img_12, IMG_01462, rust, rusty, tatoo_dragon ],
  };

  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
      <section className="container mx-auto flex items-center justify-center mt-20 mb-10">
        <h1 className="text-4xl font-bold p-4 border-4 border-gray-500 rounded inline-block">
          Portfolio :
        </h1>
      </section>
      <section className="container mx-auto flex space-x-4 items-center justify-center mt-20 mb-10">
      <a
          className="text-2xl font-bold p-4 border-4 border-gray-500 rounded inline-block"
          onClick={() => handleLinkClick('3d')}
          href="#"
        >
          3D
        </a>
        <a
          className="text-2xl font-bold p-4 border-4 border-gray-500 rounded inline-block"
          onClick={() => handleLinkClick('avatars')}
          href="#"
        >
          Avatars
        </a>
        <a
          className="text-2xl font-bold p-4 border-4 border-gray-500 rounded inline-block"
          onClick={() => handleLinkClick('collab')}
          href="#"
        >
          Collab
        </a>
        <a
          className="text-2xl font-bold p-4 border-4 border-gray-500 rounded inline-block"
          onClick={() => handleLinkClick('illustrations')}
          href="#"
        >
          Illustrations
        </a>
        <a
          className="text-2xl font-bold p-4 border-4 border-gray-500 rounded inline-block"
          onClick={() => handleLinkClick('logo')}
          href="#"
        >
          Logo
        </a>
        <a
          className="text-2xl font-bold p-4 border-4 border-gray-500 rounded inline-block"
          onClick={() => handleLinkClick('pokemon')}
          href="#"
        >
          Pokemon
        </a>
        <a
          className="text-2xl font-bold p-4 border-4 border-gray-500 rounded inline-block"
          onClick={() => handleLinkClick('tattoo')}
          href="#"
        >
          tattoo
        </a>
        <a
          className="text-2xl font-bold p-4 border-4 border-gray-500 rounded inline-block"
          onClick={() => handleLinkClick('twitch')}
          href="#"
        >
          Twitch
        </a>
        <a
          className="text-2xl font-bold p-4 border-4 border-gray-500 rounded inline-block"
          onClick={() => handleLinkClick('autres')}
          href="#"
        >
          Autres
        </a>
      </section>
      <div className="image-gallery grid grid-cols-3 gap-4">
        {selectedCategory && (
          <>
            {imagesByCategory[selectedCategory].map((image, index) => (
              <img key={index} className="w-full h-auto mb-4" src={image} alt={`Image ${index}`} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;

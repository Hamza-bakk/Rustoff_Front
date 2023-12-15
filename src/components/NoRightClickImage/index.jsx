import { useEffect } from 'react';

const NoRightClickImage = () => {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      alert("Dommage bien essayé !");
    };

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('contextmenu', handleContextMenu);
    });

    return () => {
      // Nettoyer les écouteurs d'événements lors de la suppression du composant
      images.forEach((img) => {
        img.removeEventListener('contextmenu', handleContextMenu);
      });
    };
  }, []);

  return null; // Ce composant ne rend rien dans l'interface utilisateur
};

export default NoRightClickImage;

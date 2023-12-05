const LegalSection = () => {
  return (
    <section className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Mentions Légales</h1>
        <article>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Propriété intellectuelle</h2>
            <p className="text-gray-700">
              L'ensemble de ce site relève de la législation française et internationale 
              sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
              reproduction sont réservés, y compris les documents téléchargeables et les 
              représentations iconographiques et photographiques.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Responsabilité</h2>
            <p className="text-gray-700">
              L'éditeur du site met à disposition un contenu informatif. Malgré tout le 
              soin apporté aux informations diffusées, l'éditeur du site décline toute 
              responsabilité en cas d'erreur ou d'omission.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default LegalSection;

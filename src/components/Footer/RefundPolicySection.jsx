
const RefundPolicySection = () => {
  return (
    <section className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Politique de Remboursement</h1>
        <article>
          <p className="mb-4">
            Notre politique de remboursement s&apos;applique aux produits et services achetés directement auprès de Rustoff.
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Demande de remboursement</h2>
            <p className="text-gray-700">
              Pour être éligible à un remboursement, vous devez soumettre une demande écrite dans un délai de 2 jours à compter de la date d&apos;achat. Votre demande doit inclure les détails suivants :
            </p>
            <ul className="list-disc pl-6">
              <li>Nom complet</li>
              <li>Adresse e-mail associée à l&apos;achat</li>
              <li>Date d&apos;achat</li>
              <li>Numéro de commande</li>
              <li>Raison de la demande de remboursement</li>
            </ul>
          </div>
          <p className="mb-4">
            Nous examinerons votre demande et vous informerons de la décision. Si votre demande est approuvée, le remboursement sera effectué selon le mode de paiement original dans un délai de [nombre de jours] jours.
          </p>
          <div>
            <h2 className="text-xl font-bold mb-2">Exceptions</h2>
            <p className="text-gray-700">
              Les produits ou services suivants ne sont pas éligibles au remboursement :
            </p>
            <ul className="list-disc pl-6">
              <li>Produits numériques téléchargeables après achat.</li>
              <li>Services consommés ou utilisés après l&apos;achat.</li>
              <li>Produits ou services achetés auprès de revendeurs tiers.</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
};

export default RefundPolicySection;

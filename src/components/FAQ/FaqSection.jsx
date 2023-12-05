import { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="">
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <h2 className="text-2xl font-semibold sm:text-4xl text-center">
          Foire aux questions (FAQ)
        </h2>
        <p className="mt-4 mb-8 dark:text-violet-600 text-center">
          Réponses à vos questions fréquentes sur nos services.
        </p>
        <div className="space-y-4">
          {faqData.map((question, index) => (
            <div
              className="w-full border rounded-lg bg-gray-800"
              key={index}
            >
              <button
                className="flex items-center justify-between px-4 text-white py-6 w-full text-left focus:outline-none focus-visible:ri"
                onClick={() => toggleAnswer(index)}
              >
                <span>{question.question}</span>
                {openIndex === index ? (
                  <AiOutlineMinus size={20} />
                ) : (
                  <AiOutlinePlus size={20} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                  <p>{question.answer}</p>
                  <br />
                  {question.details && (
                    <div>
                      {question.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  )}
                  {question.additionalDetail && (
                    <div className="mt-4">{question.additionalDetail}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection



const faqData = [
  {
    question: "1. Comment puis-je passer une commande dans la boutique ?",
    answer: "Pour passer une commande dans notre boutique, suivez ces étapes :",
    details: [
      "Parcourez notre boutique et trouvez le produit que vous souhaitez acheter.",
      "Cliquez sur le bouton 'Ajouter au panier' pour Ajouter au panier sur la page du produit.",
      "Accédez à votre panier en cliquant sur l'icône du panier en haut à droite.",
      "Cliquez sur le bouton 'Passer la commande' dans le panier",
      "Remplissez les informations requises et choisissez une méthode de paiement.",
      "Confirmez votre commande et effectuez le paiement.",
    ],
    additionalDetail: " Une fois votre commande passée avec succès, vous recevrez une confirmation par e-mail.",
  },
  {
    question: "2. Comment demander un devis pour un projet graphique ?",
    answer: "Pour demander un devis pour un projet graphique, suivez ces étapes :",
    details: [
      "Visitez notre page de demande de devis, le bouton sur la page d'accueil.",
      "Remplissez le formulaire de demande de devis en fournissant tous les détails pertinents sur votre projet.",
      "Cliquez sur le bouton 'Envoyer la demande'.",
      "Notre équipe examinera votre demande et vous contactera pour discuter des détails du projet et de la tarification.",
    ],
    additionalDetail: "Nous nous efforçons de répondre à toutes les demandes de devis dans les plus brefs délais.",
  },
  {
    question: "3. Où puis-je consulter votre portfolio de projets précédents ?",
    answer: "Pour demander un devis pour un projet graphique, suivez ces étapes :",
    details: [
      "Vous pouvez consulter notre portfolio de projets précédents sur notre page de portfolio. Nous y présentons divers projets graphiques que nous avons réalisés pour nos clients.",
    ],
    additionalDetail: "Visitez notre page de portfolio pour voir notre travail et obtenir des idées pour votre propre projet.",
  },
  {
    question: "4. Quels types de services graphiques proposez-vous ?",
    answer: "Nous proposons une gamme complète de services graphiques, notamment :",
    details: [
      "Conception de logos",
      "Illustrations",
      "Conception 3D",
      "Animations",
      "Twitch overlay et émotes",
      "Dessin pour tatouages",
      "Dessin pour du merchandising",
      "Avatars personnalisés",
      "Et bien plus encore !"
    ],
    additionalDetail: "Si vous avez un projet spécifique en tête, n'hésitez pas à nous contacter pour discuter de vos besoins",
  },
  {
    question: "5. Quelle est la durée moyenne d'un projet graphique ?",
    answer: "La durée d'un projet graphique peut varier en fonction de sa complexité, de sa taille et des exigences spécifiques. En général, la durée moyenne d'un projet peut être estimée comme suit :",
    details: [
      "Projets de logo/avatars/tattoo : 1-2 semaines",
      "Projets d'illustration/merch : 2-3 semaines",
      "Conception 3D/Animations : 3-4 semaines",
      "Conception Twitch ( selon la quantitée ) : 1-4 semaines",
    ],
    additionalDetail: "La durée exacte sera déterminée en fonction de la portée du projet et de la disponibilité.",
  },
  {
    question: "6. Pouvez-vous personnaliser des designs existants ?",
    answer: "Oui, nous pouvons personnaliser des designs existants selon vos besoins. Si vous avez un design préexistant que vous souhaitez modifier ou améliorer, veuillez nous fournir les fichiers sources ou les détails du design que vous souhaitez personnaliser.",
    details: [
      "Nous travaillerons en étroite collaboration avec vous pour comprendre vos exigences de personnalisation et créer un design qui correspond à vos attentes.",
    ],
    additionalDetail: "Des prix fixent sont dispo dans la boutique pour tout ce qui n'es pas sur mesure.",
  },
  {
    question: "7. Quels sont vos tarifs pour les services graphiques ?",
    answer: "Oui, nous pouvons personnaliser des designs existants selon vos besoins. Si vous avez un design préexistant que vous souhaitez modifier ou améliorer, veuillez nous fournir les fichiers sources ou les détails du design que vous souhaitez personnaliser.",
    details: [
      "Pour obtenir un devis précis pour votre projet, nous vous encourageons à remplir notre formulaire de demande de devis sur notre site Web. Nous examinerons vos besoins et vous fournirons un devis détaillé en conséquence.",
    ],
  },
  {
    question: "8. Comment puis-je vous contacter pour discuter de mon projet ?",
    answer: "Pour discuter de votre projet avec nous, vous pouvez nous contacter de l'une des manières suivantes :.",
    details: [
      "Remplissez notre formulaire de contact sur notre site Web.",
      "Envoyez-nous un e-mail à [rustgraph@gmail.com].",
    ],
    additionalDetail: "Nous sommes impatients de discuter de votre projet et de vous fournir des solutions graphiques sur mesure.",
  },
];


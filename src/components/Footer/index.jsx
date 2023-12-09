import { FiInstagram, FiMail } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-2">
      <section className="container flex flex-col p-4 mx-auto md:p-8 lg:flex-row divide-gray-400">
        <ul className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
        <li><Link to="/mentions-legales" aria-label="Mentions légales">Mentions légales</Link></li>
        <li><Link to="/politique-confidentialite" aria-label="Politique de confidentialité">Politique de confidentialité</Link></li>
        <li><Link to="/politique-remboursement" aria-label="Politique de remboursement">Politique de remboursement</Link></li>
        </ul>
        <article className="flex flex-col justify-center pt-6 lg:pt-0">
          <div className="flex justify-center space-x-4">
            <a rel="noopener noreferrer" href="https://www.instagram.com/rustyy_off/" target="_blank" title="Instagram" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-400 text-gray-900 hover:bg-violet-300" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a rel="noopener noreferrer" href="https://twitter.com/rustyoff" title="Twitter" target="_blank" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-400 text-gray-900 hover:bg-violet-300" aria-label="Twitter">
            <FaXTwitter />
            </a>
            <a rel="noopener noreferrer" href="mailto:rustgraph@gmail.com" title="Gmail" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-400 text-gray-900 hover:bg-violet-300" aria-label="Gmail">
              <FiMail />
            </a>
          </div>
        </article>
      </section>
      <section className="flex justify-center space-x-4">
        <p>&copy; Rustoff 2023. Tous droits réservés.</p>
      </section>
    </footer>
  );
};

export default Footer;

import React from 'react';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <FaChevronRight className="text-2xl text-[#A88AED] hover:text-[#7B5BC7] transition-colors" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <FaChevronLeft className="text-2xl text-[#A88AED] hover:text-[#7B5BC7] transition-colors" />
    </div>
  );
};
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { FaUsers, FaRobot, FaChartLine, FaUpload, FaRobot as FaRobotStep, FaUserFriends, FaGraduationCap, FaChevronLeft, FaChevronRight, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import desktopBg from '../assets/Desktop - 21.png';

const HomePage = () => {
  const features = [
    {
      icon: <FaUsers className="text-[#A88AED] text-2xl" />,
      title: "Collaboration",
      description: "Créez des groupes d'étude et partagez vos ressources avec vos camarades."
    },
    {
      icon: <FaRobot className="text-[#A88AED] text-2xl" />,
      title: "Génération IA",
      description: "Transformez vos cours en quiz instantanément grâce à notre intelligence artificielle avancée."
    },
    {
      icon: <FaChartLine className="text-[#A88AED] text-2xl" />,
      title: "Suivi de progression",
      description: "Suivez vos résultats et progressez grâce à des statistiques détaillées."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos fonctionnalités</h2>
              <p className="text-xl text-gray-600">Découvrez comment Edumate peut transformer votre façon d'apprendre</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: '#C2A8FF' }}>
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#A88AED] to-[#CBD83B] opacity-20"></div>
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#A88AED] to-[#CBD83B] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Étape 1 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-[#CBD83B] flex items-center justify-center text-white text-2xl shadow-lg">
                  <FaUpload className="text-white" />
                </div>
                <div className="pl-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Importez votre cours</h3>
                  <p className="text-gray-600 leading-relaxed">Téléchargez facilement vos documents (PDF ou texte) sur notre plateforme sécurisée en quelques clics.</p>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full bg-[#A88AED]/10"></div>
              </div>
              
              {/* Étape 2 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-[#CBD83B] flex items-center justify-center text-white text-2xl shadow-lg">
                  <FaRobotStep className="text-white" />
                </div>
                <div className="pl-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">L'IA génère vos quiz</h3>
                  <p className="text-gray-600 leading-relaxed">Notre intelligence artificielle analyse votre contenu et crée automatiquement des quiz personnalisés et des flashcards.</p>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full bg-[#9A7AD9]/10"></div>
              </div>
              
              {/* Étape 3 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-[#CBD83B] flex items-center justify-center text-white text-2xl shadow-lg">
                  <FaUserFriends className="text-white" />
                </div>
                <div className="pl-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Partagez avec votre groupe</h3>
                  <p className="text-gray-600 leading-relaxed">Créez des groupes d'étude et collaborez en temps réel avec vos camarades sur les mêmes ressources.</p>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full bg-[#7B5BC7]/10"></div>
              </div>
              
              {/* Étape 4 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-[#CBD83B] flex items-center justify-center text-white text-2xl shadow-lg">
                  <FaGraduationCap className="text-white" />
                </div>
                <div className="pl-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Révisez et progressez</h3>
                  <p className="text-gray-600 leading-relaxed">Suivez vos progrès avec des statistiques détaillées et améliorez vos résultats grâce à des révisions ciblées.</p>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full bg-[#5D3BB4]/10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
          {/* Éléments décoratifs */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#A88AED] opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#CBD83B] opacity-10 rounded-full filter blur-3xl"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos utilisateurs</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#A88AED] to-[#CBD83B] mx-auto mb-12"></div>
            </div>
            
            <div className="relative">
              <Slider 
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
                centerMode={false}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      centerMode: false
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      centerMode: false
                    }
                  }
                ]}
                className="testimonial-slider"
              >
                {[
                  {
                    id: 1,
                    initial: 'M',
                    name: 'Marie D.',
                    role: 'Étudiante en médecine',
                    text: '"Grâce à Edumate, j\'ai pu réduire mon temps de révision de moitié. Les quiz générés automatiquement sont parfaits pour mémoriser l\'anatomie !"',
                    bgColor: 'bg-[#CBD83B]'
                  },
                  {
                    id: 2,
                    initial: 'T',
                    name: 'Thomas L.',
                    role: 'Étudiant en droit',
                    text: '"La fonctionnalité de groupe d\'étude a révolutionné notre façon de réviser. On partage nos quiz et on s\'entraide, c\'est génial !"',
                    bgColor: 'bg-[#A88AED]'
                  },
                  {
                    id: 3,
                    initial: 'S',
                    name: 'Sophie M.',
                    role: 'Étudiante en informatique',
                    text: '"L\'IA est incroyablement précise pour créer des quiz pertinents. J\'ai amélioré mes notes de 2 points depuis que j\'utilise Edumate !"',
                    bgColor: 'bg-[#7B5BC7]'
                  },
                  {
                    id: 4,
                    initial: 'A',
                    name: 'Alexandre P.',
                    role: 'Étudiant en commerce',
                    text: '"La plateforme est intuitive et les quiz sont très bien faits. Parfait pour réviser mes cours de marketing !"',
                    bgColor: 'bg-[#5D3BB4]'
                  }
                ].map((testimonial) => (
                  <div key={testimonial.id} className="px-4 outline-none">
                    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mx-auto w-full h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className={`w-16 h-16 rounded-lg ${testimonial.bgColor} flex items-center justify-center text-white text-2xl font-bold mr-4`}>
                          <span>{testimonial.initial}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic mb-4">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            
            <style jsx global>{`
              .slick-slide {
                padding: 20px 10px;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex !important;
                height: 100%;
              }
              .slick-slide > div {
                width: 100%;
                height: 100%;
              }
              .slick-slide:not(.slick-current) {
                opacity: 1;
                transform: none;
              }
              .slick-current {
                transform: none;
                z-index: 1;
              }
              .slick-slide:hover {
                opacity: 1 !important;
                transform: none !important;
              }
              .slick-dots li button:before {
                font-size: 12px;
                color: #CBD83B;
              }
              .slick-dots li.slick-active button:before {
                color: #A88AED;
              }
              .slick-prev, .slick-next {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: white !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                display: flex !important;
                align-items: center;
                justify-content: center;
                z-index: 10;
                transition: all 0.3s ease;
              }
              .slick-prev:hover, .slick-next:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.15);
              }
              .slick-prev:before, .slick-next:before {
                content: '' !important;
              }
              @media (max-width: 768px) {
                .slick-prev {
                  left: -60px;
                }
                .slick-next {
                  right: -60px;
                }
              }
              @media (max-width: 1024px) {
                .slick-prev {
                  left: -40px;
                }
                .slick-next {
                  right: -40px;
                }
              }
            `}</style>
          </div>
        </section>

      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Edumate</h2>
              <p className="mt-2 text-gray-300">L'outil ultime pour réviser efficacement</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-6">
                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-white hover:text-gray-200 text-sm">Mentions légales</a>
                <a href="#" className="text-white hover:text-gray-200 text-sm">Confidentialité</a>
                <a href="#" className="text-white hover:text-gray-200 text-sm">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white">
            <p>© {new Date().getFullYear()} Edumate. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

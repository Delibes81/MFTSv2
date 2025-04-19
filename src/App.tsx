import React, { useEffect, useRef, useState } from 'react';
import { Monitor, Printer, Camera, Code2, Mail, MapPin, ChevronDown, Menu, X, PhoneCall } from 'lucide-react';
import emailjs from '@emailjs/browser';
import logo from './assets/logo.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const formRef = useRef<HTMLFormElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Tecnología digital con código"
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Servidor de tecnología avanzada"
    },
    {
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Innovación tecnológica"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setIsMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const formData = new FormData(formRef.current);
      const templateParams = {
        name: formData.get('user_name'),
        email: formData.get('user_email'),
        number: formData.get('phone_number'),
        message: formData.get('message'),
      };

      await emailjs.send(
        'service_uejh3ir',
        'template_cqxfu2r',
        templateParams,
        'p-pwDfd7VH5ssWyvj'
      );

      setSubmitStatus({
        type: 'success',
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.'
      });
      formRef.current.reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <img 
                src={logo}
                alt="MFTS Logo" 
                className="h-20 w-auto"
              />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection(heroRef)} 
                className={`text-lg font-medium transition-colors ${
                  scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/90 hover:text-white'
                }`}
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection(aboutRef)}
                className={`text-lg font-medium transition-colors ${
                  scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/90 hover:text-white'
                }`}
              >
                Nosotros
              </button>
              <button 
                onClick={() => scrollToSection(servicesRef)}
                className={`text-lg font-medium transition-colors ${
                  scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/90 hover:text-white'
                }`}
              >
                Servicios
              </button>
              <button 
                onClick={() => scrollToSection(contactRef)}
                className={`text-lg font-medium transition-colors ${
                  scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/90 hover:text-white'
                }`}
              >
                Contacto
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-4">
              <button 
                onClick={() => scrollToSection(heroRef)}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 rounded-lg"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection(aboutRef)}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 rounded-lg"
              >
                Nosotros
              </button>
              <button 
                onClick={() => scrollToSection(servicesRef)}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 rounded-lg"
              >
                Servicios
              </button>
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 rounded-lg"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover scale-105"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
                Innovación y <span className="text-blue-400">Tecnología</span> para tu Empresa
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed animate-fade-in-delay">
                Expertos en soluciones tecnológicas integrales que transforman y potencian tu negocio
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection(contactRef)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 transform"
                >
                  Contáctanos
                </button>
                <button
                  onClick={() => scrollToSection(servicesRef)}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all border border-white/30"
                >
                  Nuestros Servicios
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 w-full flex justify-center">
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="animate-bounce bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Tu Socio Tecnológico de <span className="text-blue-600">Confianza</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                En Mat Fleet Tech Services, combinamos experiencia y pasión por la tecnología para 
                ofrecer soluciones que impulsan el crecimiento de tu empresa.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">10+</h3>
                  <p className="text-gray-600">Años de Experiencia</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">500+</h3>
                  <p className="text-gray-600">Clientes Satisfechos</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Equipo técnico"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos soluciones integrales adaptadas a las necesidades específicas de tu empresa
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<Monitor className="w-16 h-16 text-blue-600" />}
              title="Soporte IT"
              description="Soporte técnico especializado 24/7 para mantener tu infraestructura funcionando sin interrupciones."
            />
            <ServiceCard
              icon={<Code2 className="w-16 h-16 text-blue-600" />}
              title="Desarrollo Web"
              description="Creación de sitios web modernos y aplicaciones personalizadas para tu negocio."
            />
            <ServiceCard
              icon={<Printer className="w-16 h-16 text-blue-600" />}
              title="Servicios de Impresión"
              description="Venta y renta de impresoras con servicio técnico incluido para empresas."
            />
            <ServiceCard
              icon={<Camera className="w-16 h-16 text-blue-600" />}
              title="CCTV"
              description="Instalación y monitoreo de sistemas de videovigilancia para la seguridad de tu negocio."
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Contáctanos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos y descubre cómo podemos potenciar tu negocio
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold mb-8">Envíanos un mensaje</h3>
              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Tu número de teléfono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="¿Cómo podemos ayudarte?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSubmitting ? 'animate-pulse' : ''
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-bold mb-6">Ubicación</h3>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-600 text-lg">
                      Providencia #821<br />
                      Col. Del valle<br />
                      Ciudad de México, CDMX<br />
                      CP. 03100
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-80 bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.53003652746!2d-99.1687267522265!3d19.3894917022157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff7e2ede5541%3A0x7de52deb216f9fa9!2sMat%20Fleet%20Tech%20Services%20%5BMFTS%5D!5e0!3m2!1ses-419!2smx!4v1744944501756!5m2!1ses-419!2smx" 
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src={logo}
                  alt="MFTS Logo" 
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-gray-400 text-lg">
                Soluciones tecnológicas integrales para empresas modernas.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Mapa del Sitio</h4>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => scrollToSection(heroRef)} className="text-gray-400 hover:text-white transition-colors">
                    Inicio
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(aboutRef)} className="text-gray-400 hover:text-white transition-colors">
                    Nosotros
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(servicesRef)} className="text-gray-400 hover:text-white transition-colors">
                    Servicios
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(contactRef)} className="text-gray-400 hover:text-white transition-colors">
                    Contacto
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-400">cdc@mattechservices.mx</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneCall className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-400">Tel: 5589852173</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneCall className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-400">Tel: 5589852174</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Mat Fleet Tech Services. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
}

export default App;
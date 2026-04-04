import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Contact() {
  const phoneNumber = "923001234567"; // Replace with your actual WhatsApp number (include country code, no + or spaces)
  const defaultMessage = "Hello Bukhari Farm! I would like to inquire about your goats.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen">
      <Helmet>
        <title>Contact Us | Bukhari Farm</title>
        <meta name="description" content="Get in touch with Bukhari Farm instantly via WhatsApp for inquiries, sales, or support." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-6">Get in Touch</h1>
          <p className="text-lg sm:text-xl text-stone-600 leading-relaxed">
            Have questions about our farm, our animals, or our management system? We're just a message away.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-stone-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900">Farm Location</h4>
                    <p className="text-stone-500 mt-1 text-sm sm:text-base">Jhang City, Punjab<br/>Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mr-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900">Operating Hours</h4>
                    <p className="text-stone-500 mt-1 text-sm sm:text-base">Mon - Sat: 8:00 AM - 6:00 PM<br/>Sun: Closed for visitors</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900">Email</h4>
                    <p className="text-stone-500 mt-1 text-sm sm:text-base">info@bukharifarm.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Integration */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-stone-200 h-full flex flex-col justify-center relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute -right-10 -top-10 w-64 h-64 bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-sm font-medium mb-6 border border-[#25D366]/20">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] mr-2 animate-pulse"></span>
                  Fastest Response Time
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 mb-4">
                  Chat with us directly
                </h3>
                
                <p className="text-stone-600 text-lg mb-8 max-w-lg leading-relaxed">
                 Send us a message directly on WhatsApp for immediate assistance regarding sales, farm visits, or general inquiries.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#25D366] border border-transparent rounded-xl hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] w-full sm:w-auto group"
                  >
                    <WhatsAppIcon className="w-6 h-6 mr-3" />
                    Start WhatsApp Chat
                    <ArrowRight className="w-5 h-5 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  <div className="flex items-center text-sm text-stone-500 mt-4 sm:mt-0 sm:ml-4">
                    <Clock className="w-4 h-4 mr-2 text-stone-400" />
                    Typically replies in minutes
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

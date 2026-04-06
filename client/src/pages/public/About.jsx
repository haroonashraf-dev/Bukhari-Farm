import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Heart, Leaf, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Helmet>
        <title>About Us | Bukhari Farm</title>
        <meta name="description" content="Learn about the history, mission, and vision of Bukhari Farm, a premium goat breeding facility." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
         <img 
            src="https://multanfarms.com/wp-content/uploads/2025/09/Why-Is-Goat-Farming-in-Pakistan-So-Awesome-1024x559.webp" 
            alt={`${settings.farmName} Goats`} 
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-stone-900/60" />
        </div>
        <div className="relative z-10 text-center px-4 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg">Our Heritage</h1>
            <p className="text-xl text-stone-200 max-w-2xl mx-auto font-medium drop-shadow">
              Raising healthy, happy goats with passion and care to provide the very best for our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Our Story</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-stone-900 mb-6 leading-tight">A Legacy of Excellence in Goat Farming</h3>
              <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                <p>
                  Founded with a deep passion for livestock and animal welfare, Bukhari Farm started as a dedicated goat breeding operation. Over the years, we have grown into a specialized facility that prioritizes the health, nutrition, and genetics of our goat herd above all else.
                </p>
                <p>
                  We believe that traditional goat farming values can coexist beautifully with modern care practices. Every goat on our farm receives individualized attention, spacious shelter, and a natural diet, ensuring they grow up healthy, strong, and well-nourished.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <img 
                  src="https://media.istockphoto.com/id/146776721/photo/goats.jpg?s=612x612&w=0&k=20&c=z0GrAzkkLYJMAWQGy0Dsc-3y0ZfDWsxxvEu8FMKwy9c=" 
                  alt="Farm landscape" 
                  className="rounded-3xl w-full h-48 sm:h-64 object-cover shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1511117833895-4b473c0b85d6?auto=format&fit=crop&q=80&w=800" 
                  alt="Goat close up" 
                  className="rounded-3xl w-full h-48 sm:h-64 object-cover shadow-lg mt-8 sm:mt-12"
                />
              </div>
              <div className="absolute -z-10 inset-0 bg-emerald-500/10 rounded-3xl transform translate-x-4 translate-y-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3">Our Philosophy</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">The Pillars of Bukhari Farm</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Ethical Breeding',
                desc: 'We prioritize the well-being of our animals, ensuring stress-free environments and natural breeding cycles.'
              },
              {
                icon: Leaf,
                title: 'Premium Nutrition',
                desc: 'Our goats are fed a carefully balanced, 100% natural diet to promote optimal growth and immunity.'
              },
              {
                icon: Award,
                title: 'Superior Genetics',
                desc: 'We selectively breed for strength, resilience, and quality, maintaining the highest standards in the industry.'
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="bg-stone-800/50 border border-stone-700/50 p-8 rounded-3xl text-center hover:bg-stone-800 transition-colors"
              >
                <div className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-stone-400 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

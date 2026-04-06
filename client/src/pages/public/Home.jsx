import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Leaf, Activity, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';
import GoatLogo from '../../components/common/GoatLogo';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Bukhari Farm | Premium Goat Breeding & Management</title>
        <meta name="description" content="Welcome to Bukhari Farm. We specialize in premium goat breeding, health tracking, and modern farm management." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
     <img 
            src="https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=2000" 
            alt="Bukhari-Farm Home Page Banner Img" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium mb-4 md:mb-6 border border-emerald-500/30 backdrop-blur-sm">
              <GoatLogo className="w-3 h-3 sm:w-4 sm:h-4 mr-2" /> Premium Goat Breeding
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-4 md:mb-6 drop-shadow-lg leading-tight">
              Raising the Standard in <br className="hidden sm:block" />
              <span className="text-emerald-400">Goat Farming</span>
            </h1>
            <p className="mt-2 md:mt-4 text-base sm:text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-8 md:mb-10 drop-shadow px-2">
              Combining traditional breeding expertise with modern, data-driven management to produce the healthiest, highest-quality herds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/about">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Discover Our Farm
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                  Farm Portal <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-stone-900 mb-2 md:mb-4">Modern Farm Management</h2>
            <p className="text-sm sm:text-base md:text-lg text-stone-600">We utilize cutting-edge technology to ensure the well-being of every animal on our farm.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Premium Breeding',
                desc: 'Carefully selected genetics to ensure strong, healthy, and high-yielding generations.'
              },
              {
                icon: Activity,
                title: 'Health Tracking',
                desc: 'Individual digital profiles for every goat, tracking vaccinations, weight, and medical history.'
              },
              {
                icon: Leaf,
                title: 'Organic Feed',
                desc: '100% natural and organic diet plans tailored to the specific needs of different breeds.'
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-stone-50 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-stone-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-row md:flex-col gap-4 md:gap-0 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center md:mb-6">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-stone-900 mb-1 md:mb-3">{feature.title}</h3>
                  <p className="text-sm md:text-base text-stone-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Content Section */}
      <section className="py-16 md:py-24 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 md:mb-6 leading-tight">Quality Breeding. <br/><span className="text-emerald-400">Healthy Goats.</span></h2>
              <p className="text-stone-400 text-base sm:text-lg mb-6 md:mb-8 leading-relaxed">
                At Bukhari Farm, we focus on raising healthy, well-cared-for goats. We provide a natural environment, proper nutrition, and regular health checkups to ensure the best quality for our community.
              </p>
              <ul className="space-y-3 md:space-y-4">
                {[
                  'Purebred and crossbred varieties',
                  'Natural and organic feeding',
                  'Routine veterinary care',
                  'Spacious and clean shelters'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-sm sm:text-base text-stone-300">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-3xl transform translate-x-4 translate-y-4" />
              <img 
                src="https://images.pexels.com/photos/15323161/pexels-photo-15323161/free-photo-of-goats-on-a-farm.jpeg" 
                alt="Goats grazing in a field" 
                className="relative rounded-3xl shadow-2xl object-cover aspect-[4/3] border border-stone-800"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

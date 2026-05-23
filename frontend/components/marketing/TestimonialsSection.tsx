'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    handle: '@priyafashion',
    avatar: 'P',
    text: 'I used to reply to every comment manually. Now AutoFlow handles everything automatically. My DMs have grown 10x.',
    role: 'Fashion Creator, Mumbai',
    avatarBg: 'bg-gradient-to-tr from-pink-500 to-rose-500',
  },
  {
    name: 'Rahul Gupta',
    handle: '@rahulcooks',
    avatar: 'R',
    text: 'Setup took only a few minutes. When someone comments about a recipe, the right link now goes out instantly.',
    role: 'Food Creator, Delhi',
    avatarBg: 'bg-gradient-to-tr from-purple-500 to-indigo-500',
  },
  {
    name: 'Sneha Patel',
    handle: '@sneha.boutique',
    avatar: 'S',
    text: 'We needed a simpler way to handle volume without hiring immediately. AutoFlow gave us structure and faster follow-up.',
    role: 'Boutique Owner, Ahmedabad',
    avatarBg: 'bg-gradient-to-tr from-orange-500 to-amber-500',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16 select-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            Customer proof
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-3xl sm:text-[32px] font-semibold leading-[1.25] tracking-tight mt-3 mb-4 font-sans"
          >
            Teams use AutoFlow to respond faster and stay more consistent
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium tracking-wide"
          >
            <span className="text-white">5/5</span> Trusted by creators and operator-led businesses
          </motion.div>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="marketing-dark-card p-7 hover:border-white/15 transition-all duration-200"
            >
              <p className="text-slate-200 text-[15px] leading-relaxed mb-6 font-normal">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${testimonial.avatarBg} flex items-center justify-center text-white text-xs font-bold shadow-inner uppercase`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white text-[14px] font-semibold leading-none mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-400 text-xs font-medium leading-none">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

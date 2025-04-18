'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/report-submission');
  };
  

  return (
    <main className="min-h-screen bg-[#0c0c0b] flex flex-col items-center justify-center px-4 relative overflow-hidden">
  
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-[#f4a300]/10 rounded-full blur-3xl -z-10"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
        className="absolute bottom-0 right-0 w-[25rem] h-[25rem] bg-[#f4a300]/20 rounded-full blur-3xl -z-10"
      />

    
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-6"
      >
        <Image src="/logo.png" alt="WeDoGood Logo" width={500} height={130} className="mx-auto" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-[#f4a300] text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-tight drop-shadow-lg"
      >
        Amplifying Impact with Innovation
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="text-white/90 text-base sm:text-lg md:text-xl mt-4 text-center max-w-2xl"
      >
        Empowering change-makers with the tools to make a difference.
      </motion.p>

      
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 3, duration: 1 }}
  className="mt-10 flex flex-col sm:flex-row gap-4"
>
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => router.push('/report-submission')}
    className="bg-[#f4a300] text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-transform duration-300 text-lg md:text-xl"
  >
    Submit Report
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => router.push('/dashboard')}
    className="bg-white text-[#f4a300] border-2 border-[#f4a300] font-semibold px-8 py-4 rounded-2xl shadow-xl transition-transform duration-300 text-lg md:text-xl"
  >
    Go to Dashboard
  </motion.button>
</motion.div>

    </main>
  );
}

"use client"
import React from 'react';
import Searchbar from '@/components/Searchbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
export default function Home() {


  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-lime-50 via-sky-50 to-indigo-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      role="main"
      aria-label="Memorial Page"
    >
      {/* Refined background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] -right-24 sm:-right-48 -top-24 sm:-top-48 
                     bg-lime-100 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-30 animate-pulse"
        />
        <div
          className="absolute w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] -left-24 sm:-left-48 -bottom-24 sm:-bottom-48 
                     bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-30 animate-pulse delay-1000"
        />
      </div>

      <div className="w-full max-w-4xl text-center relative z-10" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1
            className="text-5xl sm:text-7xl md:text-9xl font-bold text-lime-600 mb-4 sm:mb-6 mt-0 sm:-mt-20"
            style={{
              textShadow: '0 4px 8px rgba(59, 130, 246, 0.2)',
              background: 'linear-gradient(to right, #4d7c0f,#365314)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            אִתָּם
          </h1>
        </motion.div>

        <motion.p
          className="text-lg sm:text-2xl text-lime-800/80 mb-8 sm:mb-12 font-light px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          אתר הנצחה לחללי חרבות ברזל
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-6 sm:gap-8 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 className="text-xl sm:text-3xl font-medium text-lime-700/90 tracking-wide px-4">
            המסע לגיבור שלך מתחיל כאן
          </h2>

          <div className="w-full max-w-[300px] sm:w-[300px] relative px-4 sm:px-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-lime-500 to-lime-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <Searchbar />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link href="about-us" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto px-8 py-4 sm:py-3 bg-gradient-to-r from-lime-600 to-lime-700 text-white 
                       rounded-xl transition-all duration-300 focus:ring-4 focus:ring-lime-300/50
                       focus:outline-none shadow-lg hover:shadow-lime-500/30 text-lg
                       active:scale-95 hover:scale-[1.02] hover:-translate-y-0.5
                       relative group overflow-hidden"
              aria-label="Learn More"
            >
              <span className="relative z-10">על האתר</span>
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-lime-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </Link>

          <Link href="/contact-us" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto px-8 py-4 sm:py-3 bg-white/80 backdrop-blur-sm border-2 border-lime-400 
                       text-lime-700 rounded-xl transition-all duration-300
                       focus:ring-4 focus:ring-lime-300/50 focus:outline-none shadow-lg
                       hover:shadow-lime-500/20 text-lg active:scale-95 hover:scale-[1.02] 
                       hover:-translate-y-0.5 relative group overflow-hidden"
              aria-label="Contact Us"
            >
              <span className="relative z-10">צור קשר</span>
              <div className="absolute inset-0 bg-lime-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-t from-white/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      />
    </main>
  );
}
import React from 'react';
import { motion } from 'framer-motion';

const PokemonLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center min-h-screen">
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="relative w-40 h-40 mb-8"
      >
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
          alt="Pokeball"
          className="w-full h-full object-contain"
        />
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-white text-2xl font-bold text-center"
      >
        Loading PokePlanet...
      </motion.h2>
      <motion.div 
        initial={{ width: "0%" }}
        animate={{ width: "60%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-2 bg-white rounded-full mt-4 max-w-md"
      />
    </div>
  );
};

export default PokemonLoader;
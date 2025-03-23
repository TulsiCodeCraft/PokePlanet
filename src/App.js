import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import PokemonLoader from './components/PokemonLoader';

const Header = () => (
  <motion.header 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
  >
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white text-center">
      PokemonWorld
      </h1>
    </div>
  </motion.header>
);

const PokemonCard = ({ pokemon }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const result = await axios.get(pokemon.url);
      setPokemonData(result.data);
    };
    fetchPokemonData();
  }, [pokemon.url]);

  if (!pokemonData) return null;

  const getStatValue = (statName) => {
    const stat = pokemonData.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 'N/A';
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 20px ${getTypeColor(pokemonData.types[0].type.name)}`,
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl overflow-hidden transform transition-all duration-300"
    >
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-48 w-48 mx-auto"
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
            alt={pokemon.name}
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold capitalize text-gray-800">
            {pokemon.name}
          </h2>
          
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            {pokemonData.types.map((type, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 text-sm font-medium rounded-full text-white"
                style={{
                  backgroundColor: getTypeColor(type.type.name)
                }}
              >
                {type.type.name}
              </motion.span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-600">Height</p>
              <p className="font-semibold">{(pokemonData.height * 0.1).toFixed(1)}m</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-600">Weight</p>
              <p className="font-semibold">{(pokemonData.weight * 0.1).toFixed(1)}kg</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-600">Speed</p>
              <p className="font-semibold">{getStatValue('speed')}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-600">Base XP</p>
              <p className="font-semibold">{pokemonData.base_experience}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const getTypeColor = (type) => {
  const colors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };
  return colors[type] || '#777777';
};

const MainContent = ({ pokemon, searchTerm, setSearchTerm }) => (
  <div className="min-h-screen bg-gray-100">
    <Header />
    
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.input
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block px-4 py-2 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {pokemon
          .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((p, index) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PokemonCard pokemon={p} />
            </motion.div>
          ))}
      </motion.div>
    </main>
  </div>
);

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        setPokemon(result.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <PokemonLoader key="loader" />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MainContent 
            pokemon={pokemon}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
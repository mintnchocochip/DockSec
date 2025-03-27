import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle, Database, X } from 'lucide-react';

function RemoveContainer({ containers, removeContainer }) {
  const [selectedContainer, setSelectedContainer] = useState('');

  const handleRemove = () => {
    if (!selectedContainer) return;
    removeContainer(selectedContainer);
    setSelectedContainer('');
  };

  return (
    <div className="w-full h-screen bg-slate-900 overflow-hidden relative flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#2C2C34_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        
        {/* Floating Geometric Shapes */}
        <motion.div
          initial={{ x: -100, y: -100, opacity: 0.3 }}
          animate={{ 
            x: [-100, 50, -100],
            y: [-100, 50, -100],
            rotate: 360
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl"
        />
        <motion.div
          initial={{ x: 100, y: 100, opacity: 0.3 }}
          animate={{ 
            x: [100, -50, 100],
            y: [100, -50, 100],
            rotate: -360
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-2xl"
        />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md z-10 relative">
        {/* Header with Decorative Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mb-6 text-center relative"
        >
          {/* Decorative Border */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-red-600/20 rounded-xl blur-lg"></div>
          
          <div className="relative">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
              <Database className="mr-3 text-red-500 animate-pulse" />
              Remove Container
            </h1>
            <p className="text-gray-400">Manage and Remove Monitored Containers</p>
          </div>
        </motion.div>

        {/* Container Selection Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#1E1E24] to-[#121217] border border-[#2C2C34] rounded-2xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-red-600/20 opacity-30 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="mb-6">
              <label className="block text-white mb-2">Select Container to Remove</label>
              <div className="relative">
                <select
                  value={selectedContainer}
                  onChange={(e) => setSelectedContainer(e.target.value)}
                  className="w-full bg-[#0A0F18] border border-[#2C2C34] rounded-lg p-3 text-white focus:ring-2 focus:ring-red-500 transition-all appearance-none pr-10"
                >
                  <option value="">Select a Container</option>
                  {containers.map(container => (
                    <option key={container.id} value={container.id}>
                      {container.name} ({container.type})
                    </option>
                  ))}
                </select>
                {/* Custom dropdown icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <X className="w-5 h-5" />
                </div>
              </div>
            </div>

            {selectedContainer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center"
              >
                <AlertTriangle className="mr-3 text-red-500 w-8 h-8 animate-bounce" />
                <p className="text-red-400">
                  Warning: Removing this container will permanently stop monitoring and delete its associated data.
                </p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRemove}
              disabled={!selectedContainer}
              className={`w-full flex items-center justify-center p-4 rounded-lg relative overflow-hidden ${
                selectedContainer
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white font-semibold transition-all`}
            >
              {/* Gradient Overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-red-600/30 opacity-0 hover:opacity-100 transition-opacity"></span>
              
              <span className="relative z-10 flex items-center">
                <Trash2 className="mr-2 w-6 h-6" />
                Remove Container
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RemoveContainer;
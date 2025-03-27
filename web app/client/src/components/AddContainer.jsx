import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusSquare, Server } from 'lucide-react';

function AddContainer({ addContainer }) {
  const [newContainer, setNewContainer] = useState({
    name: '',
    type: ''
  });

  const containerTypes = [
    'Docker',
    'Kubernetes',
    'Virtual Machine',
    'Bare Metal',
    'Cloud Instance'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContainer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newContainer.name || !newContainer.type) {
      alert('Please fill in all fields');
      return;
    }

    // Call the addContainer function passed from parent
    addContainer(newContainer);

    // Reset form
    setNewContainer({
      name: '',
      type: ''
    });
  };

  return (
    <div className='bg-[#121217] min-h-screen p-8'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Add New Container</h1>
        <p className="text-gray-400">Create and Configure a New Container</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1E1E24] border border-[#2C2C34] rounded-lg p-8 max-w-xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white mb-2">
              Container Name
            </label>
            <div className="flex items-center">
              <Server className="mr-3 text-blue-500" />
              <input
                type="text"
                id="name"
                name="name"
                value={newContainer.name}
                onChange={handleInputChange}
                placeholder="Enter container name"
                className="w-full bg-[#121217] text-white p-3 rounded-lg border border-[#2C2C34] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-white mb-2">
              Container Type
            </label>
            <select
              id="type"
              name="type"
              value={newContainer.type}
              onChange={handleInputChange}
              className="w-full bg-[#121217] text-white p-3 rounded-lg border border-[#2C2C34] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Container Type</option>
              {containerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <PlusSquare className="mr-2" />
            Add Container
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default AddContainer;
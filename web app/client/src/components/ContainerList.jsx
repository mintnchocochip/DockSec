import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, RefreshCw, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ContainerList() {
  const [containers, setContainers] = useState([
    { 
      id: '1', 
      name: 'Web Server', 
      status: 'Active', 
      cpu: '65%', 
      memory: '45%', 
      network: '30%',
      historicalData: [
        { name: 'Jan', cpu: 50, memory: 40, network: 30 },
        { name: 'Feb', cpu: 65, memory: 45, network: 35 },
        { name: 'Mar', cpu: 75, memory: 55, network: 45 },
      ]
    },
    { 
      id: '2', 
      name: 'Database Cluster', 
      status: 'Warning', 
      cpu: '85%', 
      memory: '75%', 
      network: '60%',
      historicalData: [
        { name: 'Jan', cpu: 70, memory: 60, network: 50 },
        { name: 'Feb', cpu: 85, memory: 75, network: 65 },
        { name: 'Mar', cpu: 90, memory: 80, network: 70 },
      ]
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-500';
      case 'Warning': return 'bg-yellow-500';
      case 'Critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Optionally update containers data here
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const graphVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <div className='bg-slate-900 min-h-screen p-8 overflow-hidden relative'>
      {/* Animated Background Particles */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 5,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-[radial-gradient(#2C2C34_1px,transparent_1px)] [background-size:16px_16px] opacity-20 z-0"
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8 relative z-10"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Containers</h1>
          <p className="text-gray-400">Manage and Monitor Your Containers</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className={`
            bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center
            ${isRefreshing ? 'animate-pulse' : ''}
          `}
        >
          <AnimatePresence mode="wait">
            {isRefreshing ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <RefreshCw className="mr-2 animate-spin" size={16} />
              </motion.span>
            ) : (
              <motion.span
                key="normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <RefreshCw className="mr-2" size={16} />
              </motion.span>
            )}
          </AnimatePresence>
          Refresh
        </motion.button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-6"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-[#1E1E24] border border-[#2C2C34] rounded-lg overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-[#121217] text-gray-400">
              <tr>
                <th className="p-4 text-left">Container</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">CPU</th>
                <th className="p-4 text-left">Memory</th>
                <th className="p-4 text-left">Network</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {containers.map((container, index) => (
                <motion.tr 
                  key={container.id} 
                  variants={itemVariants}
                  className="border-b border-[#2C2C34] hover:bg-[#2C2C34]/50 transition-colors"
                >
                  <td className="p-4 flex items-center">
                    <Server className="mr-3 text-blue-500" />
                    <span className="font-semibold text-white">{container.name}</span>
                  </td>
                  <td className="p-4">
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`
                        px-3 py-1 rounded-full text-xs text-white
                        ${getStatusColor(container.status)}
                      `}
                    >
                      {container.status}
                    </motion.span>
                  </td>
                  <td className="p-4 text-white">{container.cpu}</td>
                  <td className="p-4 text-white">{container.memory}</td>
                  <td className="p-4 text-white">{container.network}</td>
                  <td className="p-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-500 hover:underline mr-3"
                    >
                      Details
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-red-500 hover:underline"
                    >
                      Stop
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div 
          variants={graphVariants}
          className="bg-[#1E1E24] border border-[#2C2C34] rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Container Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart 
              data={containers[0].historicalData}
              style={{ 
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2C34" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#121217', 
                  border: 'none',
                  borderRadius: '8px'
                }} 
                labelStyle={{ color: 'white' }}
                itemStyle={{ color: '#6B7280' }}
              />
              <Area 
                type="monotone" 
                dataKey="cpu" 
                stroke="#3B82F6" 
                fill="rgba(59, 130, 246, 0.2)"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease"
              />
              <Area 
                type="monotone" 
                dataKey="memory" 
                stroke="#10B981" 
                fill="rgba(16, 185, 129, 0.2)"
                animationBegin={200}
                animationDuration={1000}
                animationEasing="ease"
              />
              <Area 
                type="monotone" 
                dataKey="network" 
                stroke="#EAB308" 
                fill="rgba(234, 179, 8, 0.2)"
                animationBegin={400}
                animationDuration={1000}
                animationEasing="ease"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ContainerList;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Server, AlertTriangle, Database, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard({ containers }) {
  const navigate = useNavigate();

  // Calculate statistics dynamically
  const totalContainers = containers.length;
  const activeAlerts = containers.filter(c => c.status !== 'Active').length;
  const averageUsage = containers.length 
    ? `${Math.round(containers.reduce((acc, c) => acc + parseInt(c.usage || '50%'), 0) / containers.length)}%`
    : '0%';

  const statCards = [
    { icon: Server, title: 'Total Containers', value: totalContainers, color: 'text-blue-500' },
    { icon: AlertTriangle, title: 'Active Alerts', value: activeAlerts, color: 'text-yellow-500' },
    { icon: Database, title: 'Resource Usage', value: averageUsage, color: 'text-green-500' },
  ];

  // Generate sample resource usage data for chart
  const resourceData = [
    { name: 'Jan', cpu: 65, memory: 45, network: 30 },
    { name: 'Feb', cpu: 75, memory: 55, network: 40 },
    { name: 'Mar', cpu: 80, memory: 60, network: 50 },
    { name: 'Apr', cpu: 70, memory: 50, network: 35 },
    { name: 'May', cpu: 85, memory: 65, network: 55 },
  ];

  return (
    <div className='bg-[#121217] min-h-screen p-8'>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Container Monitoring Overview</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-[#1E1E24] border border-[#2C2C34] rounded-lg p-6 flex items-center"
          >
            <div className={`mr-4 ${card.color}`}>
              <card.icon size={40} />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-white">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }} 
          className="bg-[#1E1E24] border border-[#2C2C34] rounded-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Container Status</h2>
            <button onClick={() => navigate("/containers")} className="text-blue-500 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {containers.map((container, index) => (
              <div key={index} className="flex items-center justify-between bg-[#121217] p-4 rounded-lg">
                <div className="flex items-center">
                  <Server className="mr-4 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-white">{container.name}</h3>
                    <p className={`text-sm ${container.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {container.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BarChart2 className="mr-2 text-gray-400" />
                  <span className="text-white">{container.usage || 'N/A'}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }} 
          className="bg-[#1E1E24] border border-[#2C2C34] rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Resource Utilization</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={resourceData}>
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
              <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="memory" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="network" stroke="#EAB308" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
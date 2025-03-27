import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Zap, Cloud, Cpu, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function DynamicBackground() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add(
        'absolute', 
        'bg-blue-500', 
        'opacity-50', 
        'rounded-full', 
        'animate-particle'
      );
      
      // Random size
      const size = Math.random() * 10 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Add to background
      background.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        background.removeChild(particle);
      }, 5000);
    };

    // Create particles every 200ms
    const particleInterval = setInterval(createParticle, 200);

    // Cleanup
    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div 
      ref={backgroundRef}
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#0D1117] to-[#1A2634]"
    />
  );
}

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "AI-Powered Security",
      description: "Machine learning-driven anomaly detection and cybersecurity monitoring.",
      color: "text-blue-500",
      animation: { x: [-10, 0], opacity: [0, 1] }
    },
    {
      icon: Cloud,
      title: "Cloud-Native Protection",
      description: "Seamless integration with cloud infrastructure for real-time security.",
      color: "text-purple-500",
      animation: { x: [10, 0], opacity: [0, 1] }
    },
    {
      icon: Cpu,
      title: "Intelligent Monitoring",
      description: "Advanced AI to detect and prevent security threats in real-time.",
      color: "text-green-500",
      animation: { y: [20, 0], opacity: [0, 1] }
    }
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Dynamic Background */}
      <DynamicBackground />

      {/* Overlay with blur effect */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

      <div className="relative z-10">
        <nav className="relative container mx-auto flex justify-between items-center p-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2"
          >
            <Server className="text-cyan-500" />
            <h1 className="text-2xl font-bold">AI CyberShield</h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-x-6"
          >
            <a href="#features" className="hover:text-blue-500">Features</a>
            <button 
              onClick={() => navigate("/dash")} 
              className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 shadow-xl transition-all duration-300 hover:scale-105"
            >
              Dashboard
            </button>
          </motion.div>
        </nav>

        <div className="relative container mx-auto flex flex-col items-center justify-center text-center min-h-[80vh]">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, type: "spring" }}
            className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-300"
          >
            AI-Powered Cloud Security
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-300 text-lg mb-8 max-w-2xl"
          >
            Revolutionizing cloud security with AI-driven insights and automated threat detection.
          </motion.p>
        </div>

        <div id="features" className="relative container mx-auto grid md:grid-cols-3 gap-6 px-6 py-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, ...feature.animation }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-[#121217]/70 backdrop-blur-lg p-6 rounded-lg shadow-2xl text-center border border-[#2C2C34] hover:scale-105 transition-transform"
            >
              <feature.icon className={`mx-auto mb-3 ${feature.color}`} size={40} />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  PlusSquare, 
  Trash2, 
  Menu, 
  X 
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dash' },
  { icon: PlusSquare, label: 'Add Container', path: '/add-container' },
  { icon: Trash2, label: 'Remove Container', path: '/remove-container' },
];

function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(true); // Default to minimized

  const sidebarVariants = {
    expanded: { 
      width: 280,
      transition: { duration: 0.3 }
    },
    minimized: { 
      width: 100,
      transition: { duration: 0.3 }
    }
  };

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <motion.aside 
      initial="minimized"
      animate={isMinimized ? "minimized" : "expanded"}
      variants={sidebarVariants}
      className={`fixed left-0 top-0 h-screen bg-[#121217] border-r border-[#1E1E24] p-4 z-50 shadow-lg overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <motion.div 
            animate={{ 
              scale: isMinimized ? 1.5 : 1,
              transition: { duration: 0.3 }
            }}
          >
            <LayoutDashboard 
              className={`text-cyan-500 ${
                isMinimized ? 'w-6 h-6' : 'w-8 h-8'
              }`} 
            />
          </motion.div>
          <AnimatePresence>
            {!isMinimized && (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl font-bold text-white whitespace-nowrap"
              >
                CyberShield
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        
        <motion.button 
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 hover:text-white"
        >
          {isMinimized ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
        </motion.button>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <motion.div
            key={item.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-[#1E1E24] text-gray-400 ${
                isMinimized ? 'justify-center' : ''
              }`}
            >
              <motion.div
                animate={{ 
                  scale: isMinimized ? 1.5 : 1,
                  transition: { duration: 0.3 }
                }}
              >
                <item.icon className={`${
                  isMinimized 
                    ? 'w-6 h-6 mb-0 mr-0' 
                    : 'w-6 h-6 mr-3'
                }`} />
              </motion.div>
              <AnimatePresence>
                {!isMinimized && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
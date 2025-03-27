import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Send } from 'lucide-react';
import { SiGithub, SiLinkedin, SiGoogle } from 'react-icons/si';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, username });
    // Simulate successful login/signup
    setTimeout(() => navigate('/landing'), 1000);
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
      <motion.div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8">
        {/* Toggle Login/Sign Up */}
        <div className="flex justify-center mb-6">
          <button onClick={() => setIsLogin(true)} className={`px-4 py-2 rounded-l-full ${isLogin ? 'bg-blue-600' : 'bg-gray-700'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`px-4 py-2 rounded-r-full ${!isLogin ? 'bg-blue-600' : 'bg-gray-700'}`}>Sign Up</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="flex items-center gap-2"><User size={16} /> Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600" placeholder="Username" />
            </div>
          )}
          <div>
            <label className="flex items-center gap-2"><Mail size={16} /> Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600" placeholder="Email" required />
          </div>
          <div>
            <label className="flex items-center gap-2"><Lock size={16} /> Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600" placeholder="Password" required />
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full p-2 bg-blue-600 rounded flex justify-center items-center gap-2">
            {isLogin ? 'Login' : 'Sign Up'} <Send size={16} />
          </motion.button>
        </form>

        {/* Social Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">Or continue with</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"><SiGithub size={20} /></button>
            <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"><SiGoogle size={20} /></button>
            <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"><SiLinkedin size={20} /></button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LoginPage;

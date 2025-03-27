import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import Dashboard from './components/Dashboard';
import ContainerList from './components/ContainerList';
import AddContainer from './components/AddContainer';
import RemoveContainer from './components/RemoveContainer';
import LoginPage from './components/Login';

function App() {
  const [containers, setContainers] = useState([
    { 
      id: '1', 
      name: 'Web Server', 
      status: 'Active', 
      type: 'Docker',
      cpu: '65%', 
      memory: '45%', 
      network: '30%',
      usage: '65%',
      lastUpdated: '2 mins ago'
    },
    { 
      id: '2', 
      name: 'Database Cluster', 
      status: 'Warning', 
      type: 'Kubernetes',
      cpu: '85%', 
      memory: '75%', 
      network: '60%',
      usage: '80%',
      lastUpdated: '5 mins ago'
    }
  ]);

  const addContainer = (newContainer) => {
    const containerToAdd = {
      id: String(containers.length + 1),
      name: newContainer.name,
      status: 'Active',
      type: newContainer.type,
      cpu: '50%',
      memory: '40%',
      network: '20%',
      usage: '45%',
      lastUpdated: 'Just now'
    };
    setContainers([...containers, containerToAdd]);
  };

  const removeContainer = (containerId) => {
    setContainers(containers.filter(container => container.id !== containerId));
  };

  return (
    <Router>
      <MainLayout 
        containers={containers} 
        addContainer={addContainer} 
        removeContainer={removeContainer} 
      />
    </Router>
  );
}

// Separate component to handle sidebar visibility
function MainLayout({ containers, addContainer, removeContainer }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className={`${isLoginPage ? "w-full" : "ml-20 w-full"}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/dash" element={<Dashboard containers={containers} />} />
          <Route path="/containers" element={<ContainerList containers={containers} />} />
          <Route path="/add-container" element={<AddContainer addContainer={addContainer} />} />
          <Route path="/remove-container" element={<RemoveContainer containers={containers} removeContainer={removeContainer} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

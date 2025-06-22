// App.js
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tools from './pages/Tools';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/privacy';
import './App.css';
import TermsOfService from './pages/Terms';
import ToolPage from './pages/ToolPage';
import './styles/globals.css';
import './styles/theme.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTool, setActiveTool] = useState(null);


  return (
    <Router>
      <div className="app-container ">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="main-content  ">
          <Sidebar
            open={sidebarOpen}
          
            setOpen={setSidebarOpen}
            setActiveTool={setActiveTool}
          />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools/:toolId" element={<ToolPage   activeTool={activeTool}
                  setActiveTool={setActiveTool}/>} />

              <Route path="/tools" element={
                <Tools
                  activeTool={activeTool}
                  setActiveTool={setActiveTool}
                />
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
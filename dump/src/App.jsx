import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Nodes from './Components/Nodes';
import Services from './Components/Services';
import Tasks from './Components/Tasks';
import Secrets from './Components/Secrets';
import Configs from './Components/Configs';
import Home from './Components/Home';
import ServiceDetails from './Components/ServiceDetails'; // Import ServiceDetails component
import { ThemeProvider, useTheme } from './Context/ThemeContext'; 
import { useState } from 'react'; 

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <MainContent isSidebarOpen={isSidebarOpen} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const MainContent = ({ isSidebarOpen }) => {
  const { isDarkTheme } = useTheme(); 

  return (
    <div className={`transition-all duration-100 ${isSidebarOpen ? 'ml-64' : 'ml-16'} p-4 ${isDarkTheme ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nodes" element={<Nodes />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/secrets" element={<Secrets />} />
        <Route path="/configs" element={<Configs />} />
        <Route path="/services/:id" element={<ServiceDetails />} /> {/* Route for service details */}
      </Routes>
    </div>
  );
};

export default App;

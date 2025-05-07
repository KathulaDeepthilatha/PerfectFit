import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import OrderTracker from './OrderTracker';
import GenerateBill from './GenerateBill';
import FabricStockManagement from './FabricStockManagement';
import AppointmentScheduler from './AppointmentScheduler';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SearchFilter from './SearchFilter';
import RealTimeUpdates from './RealTimeUpdates';
import FabricStockPage from './FabricStockPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/appointments" element={<AppointmentScheduler />} />
        <Route path="/fabric-stock" element={<FabricStockManagement />} />
        <Route path="/fabric-stock-page" element={<FabricStockPage />} />
        <Route path="/generate-bill" element={<GenerateBill />} />
        <Route path="/order-tracker" element={<OrderTracker />} />
        <Route path="/real-time-updates" element={<RealTimeUpdates />} />
        <Route path="/search-filter" element={<SearchFilter />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import OrderTabs from './components/OrderTabs';
import Navbar from './common/Navbar';
import ActiveOrders from './components/ActiveOrders';
import CompletedOrders from './components/CompletedOrders';

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem('auth') === 'true';
  return isAuth ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <OrderTabs />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales/active"
          element={
            <PrivateRoute>
              <ActiveOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales/completed"
          element={
            <PrivateRoute>
              <CompletedOrders />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

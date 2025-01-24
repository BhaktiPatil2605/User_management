import React, { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function AppContent() {
  const [userToEdit, setUserToEdit] = useState(null);
  const navigate = useNavigate(); // Now inside a <Router> context

  const handleEdit = (user) => { //to set the user details once clicked on edit button
    setUserToEdit(user); // Set the user to edit
    navigate('/add-edit'); // Navigate to the add-edit route
  };

  const handleUserUpdated = () => { // to remove the set user once updated
    setUserToEdit(null); // Clear the user after update
    navigate('/'); // Navigate back to the user list
  };
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={<UserTable onEdit={handleEdit} />} //on setting the value the handleEdit function is called
        />
        <Route
          exact
          path="/add-edit"
          element={<UserForm userToEdit={userToEdit} onUserUpdated={handleUserUpdated} />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter> 
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

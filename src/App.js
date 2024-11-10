import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddItem from './components/AddItem';
import DisplayItems from './components/DisplayItems';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import ItemDetails from './components/ItemDetails';
import EditItem from './components/EditItem';

const App = () => {
  const BASE_URL = 'http://192.168.100.112:8080';

  return (
    <div className="app-container">
      <h1></h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login baseUrl={BASE_URL} />} />
          <Route path="/registration" element={<Registration baseUrl={BASE_URL} />} />
          <Route path="/display-items" element={<DisplayItems />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/edit-item" element={<EditItem />} />
          <Route path="/item-details" element={<ItemDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

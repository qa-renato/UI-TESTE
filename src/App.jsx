import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tables from './pages/Tables';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tables" element={<Tables />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

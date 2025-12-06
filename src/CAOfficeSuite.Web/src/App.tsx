import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { Layout } from './components/layout';
import { Home, Login, Clients, Tasks, Help } from './pages';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/:id" element={<Clients />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/:id" element={<Tasks />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

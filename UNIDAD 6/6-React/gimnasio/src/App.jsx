import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Actividades from '@/pages/Actividades';
import NoEncontrada from '@/pages/NoEncontrada';

export default function App() {
  // Estado elevado: Header y Actividades reciben la misma sesión.
  const [usuario, setUsuario] = useState(null);
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout usuario={usuario} onLogout={() => setUsuario(null)} />}
      >
        <Route index element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="login" element={<Login onLogin={setUsuario} />} />
        <Route
          path="actividades"
          element={
            <Actividades key={usuario ?? 'invitado'} usuario={usuario} />
          }
        />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

import RoutinesHome from './features/routines/pages/RoutinesHome';

function App() {
  const token = 'demo-token'; // en producción deberías obtenerlo dinámicamente
  const handleLogout = () => {
    console.log('Logout');
  };

  return <RoutinesHome token={token} onLogout={handleLogout} />;
}

export default App;

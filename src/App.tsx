import AppRouter from './routes/AppRouter';

function App() {
  const handleLogout = () => {
    console.log('Logout');
  };

  return <AppRouter onLogout={handleLogout} />;
}

export default App;

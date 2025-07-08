import { useEffect } from "react";
import axios from "axios";
import AppRoutes from './routes'

function App() {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  
  return <AppRoutes />
}

export default App

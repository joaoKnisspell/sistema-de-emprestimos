//React
import { BrowserRouter } from "react-router-dom";

//Rotas
import RoutesApp from "./routes";

//Contexts Providers
import UserContextProvider from "./contexts/UserContext";

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <UserContextProvider>
        <RoutesApp />
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;

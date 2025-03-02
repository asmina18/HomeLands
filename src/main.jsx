
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/variables.scss';





createRoot(document.getElementById('root')).render(
  <StrictMode>
        <UserContextProvider>
            <App />
        </UserContextProvider>
  </StrictMode>,
)



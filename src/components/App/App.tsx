import { BrowserRouter } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';
import Routes from '../../Routes';
import './App.css';
import logo from '../../logo.svg';
import { AuthProvider } from '../../context/AuthContext';

const App = () => {
  
  return (
    <BrowserRouter>
      <Navbar
        className="my-2"
        color="dark"
        dark
      >
        <NavbarBrand href="/">
          <img
            alt="logo"
            src={logo}
            style={{
              height: 40,
              width: 40
            }}
          />
          News Website
        </NavbarBrand>
      </Navbar>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

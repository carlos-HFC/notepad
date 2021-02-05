import { BrowserRouter } from "react-router-dom";

import Routes from "routes";

import 'animate.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "css/main.min.css"

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;

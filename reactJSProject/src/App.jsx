import "./App.css";
import LoginForm from "./assets/LoginForm/LoginForm";
import { useRoutes } from "react-router-dom";
import RegisterForm from "./assets/RegisterForm/RegisterForm";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <LoginForm />,
    },
    {
      path: "/RegisterForm",
      element: <RegisterForm />,
    },
  ]);
  return routes;
}

export default App;

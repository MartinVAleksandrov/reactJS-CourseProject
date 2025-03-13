import "./App.css";
import LoginForm from "./assets/LoginForm/LoginForm";
import { useRoutes } from "react-router-dom";
import RegisterForm from "./assets/RegisterForm/RegisterForm";
import Error404 from "./assets/Error404/Error404";

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
    {
      path: "/Error404",
      element: <Error404 />,
    },
  ]);
  return routes;
}

export default App;

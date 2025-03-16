import "./App.css";
import LoginForm from "./assets/LoginForm/LoginForm";
import { useRoutes } from "react-router-dom";
import RegisterForm from "./assets/RegisterForm/RegisterForm";
import Error404 from "./assets/Error404/Error404";
import HomeForm from "./assets/Home/Home";
import EditGame from "./assets/EditGame/EditGame";
import DeleteGame from "./assets/DeleteGame/DeleteGame";
import AddGame from "./assets/AddGame/AddGame";

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
      path: "/Home",
      element: <HomeForm />,
    },
    {
      path: "/AddGame",
      element: <AddGame />,
    },
    {
      path: "/Edit",
      element: <EditGame />,
    },
    {
      path: "/Delete",
      element: <DeleteGame />,
    },
    {
      path: "/Error404",
      element: <Error404 />,
    },
  ]);
  return routes;
}

export default App;

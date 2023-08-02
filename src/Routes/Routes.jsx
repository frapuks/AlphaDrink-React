//~ Import Module
import { Route } from "react-router-dom";
import { NoPage, Home, Login, Drink, Dashboard, Search } from "../Pages";

const Router = [
  { id: 1, mainPath: "*", mainElement: <NoPage /> },
  { id: 2, mainPath: "/", mainElement: <Home /> },
  { id: 3, mainPath: "/login", mainElement: <Login /> },
  { id: 4, mainPath: "/drink/:drinkId", mainElement: <Drink /> },
  { id: 5, mainPath: "/dashboard", mainElement: <Dashboard /> },
  { id: 6, mainPath: "/search/:search", mainElement: <Search /> },
];

const mainRoutes = Router.map(({ id, mainPath, mainElement }) => <Route key={id} path={mainPath} element={mainElement} />);

export { Router, mainRoutes };
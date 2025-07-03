import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./router/router";

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
}

export default App;

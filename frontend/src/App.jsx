import Navbar from "./components/ui/shared/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/ui/auth/Login.jsx";
import Signup from "./components/ui/auth/Signup.jsx";
import Home from "./components/ui/Home.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;

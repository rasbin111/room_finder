import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./views/home";
import LoginPage from "./views/login";
import { AuthProvider } from "./contexts/AuthProvider/AuthProvider";
import Layout from "./Layout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: HomePage
      },
    ]
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);

function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;

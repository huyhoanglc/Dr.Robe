import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "@/routes/routes";
import PrivateRoute from "@/components/route/PrivateRoute";
import PublicRoute from "@/components/route/PublicRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        {publicRoutes.map(({ path, component: Page, layout: Layout }) => (
          <Route
            key={path}
            path={path}
            element={
              <PublicRoute>
                <Layout>
                  <Page />
                </Layout>
              </PublicRoute>
            }
          />
        ))}

        {/* Private */}
        {privateRoutes.map(({ path, component: Page, layout: Layout }) => (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute>
                <Layout>
                  <Page />
                </Layout>
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "#4caf50",
            },
          },
          error: {
            style: {
              background: "#f44336",
            },
          },
        }}
      />
    </>
  );
}

export default App;

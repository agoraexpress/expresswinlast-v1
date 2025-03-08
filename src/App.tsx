import { Suspense, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./components/home";
import Menu from "./pages/Menu";
import Loyalty from "./pages/Loyalty";
import Cart from "./pages/Cart";
import UserInfo from "./pages/UserInfo";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminNew from "./pages/AdminNew";
import routes from "tempo-routes";
import { CartProvider } from "./context/CartContext";
import AuthGuard from "./components/layout/AuthGuard";
import { AuthProvider } from "./context/AuthContext";
import { DemoModeProvider } from "./context/DemoModeContext";

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <DemoModeProvider>
      <AuthProvider>
        <CartProvider>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">جاري التحميل...</p>
              </div>
            }
          >
            <>
              <Routes>
                <Route path="/" element={<Navigate to="/user-login" />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                  path="/home"
                  element={
                    <AuthGuard>
                      <Home />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/menu"
                  element={
                    <AuthGuard>
                      <Menu />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/loyalty"
                  element={
                    <AuthGuard>
                      <Loyalty />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <AuthGuard>
                      <Cart />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <AuthGuard>
                      <UserInfo />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <AuthGuard>
                      <Profile />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AuthGuard requireAdmin={true}>
                      <AdminNew />
                    </AuthGuard>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
            </>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </DemoModeProvider>
  );
}

export default App;

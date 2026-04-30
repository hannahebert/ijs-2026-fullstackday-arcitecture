import { Routes, Route, Outlet, Link } from "react-router";
import Index from "./pages/Index";
import GodComponent from "./pages/GodComponent";
import StateManagement from "./pages/StateManagement";
import EffectsLifecycle from "./pages/EffectsLifecycle";
import ErrorHandling from "./pages/ErrorHandling";
import Forms from "./pages/Forms";
import OverEngineering from "./pages/OverEngineering";

function Layout() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-title">
          Architecture Sins
        </Link>
        <span className="site-subtitle">React examples</span>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="god-component" element={<GodComponent />} />
        <Route path="state-management" element={<StateManagement />} />
        <Route path="effects-lifecycle" element={<EffectsLifecycle />} />
        <Route path="error-handling" element={<ErrorHandling />} />
        <Route path="forms" element={<Forms />} />
        <Route path="over-engineering" element={<OverEngineering />} />
      </Route>
    </Routes>
  );
}

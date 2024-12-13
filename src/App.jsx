import "./App.css";
import PageTemplate from "./components/Template/PageTemplate";
import { useLocation } from "./contexts/useLocation";
import CurningRoom from "./pages/CurningRoom/CurningRoom";
import StoneBall from "./pages/StoneBall/StoneBall";

function App() {
  const { selectedLocation } = useLocation();

  return (
    <>
      <PageTemplate>
        {selectedLocation.type === "curningRoom" ? (
          <CurningRoom />
        ) : (
          <StoneBall />
        )}
      </PageTemplate>
    </>
  );
}

export default App;

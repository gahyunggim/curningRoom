import { Flex } from "antd";
import "./App.css";
import PageTemplate from "./components/Template/PageTemplate";
import { useLocation } from "./contexts/useLocation";
import CurningRoom from "./pages/CurningRoom/CurningRoom";
import StoneBall from "./pages/StoneBall/StoneBall";

function App() {
  const { selectedLocation } = useLocation();

  return (
    <Flex style={{ height: "100vh" }}>
      <PageTemplate>
        {selectedLocation.type === "curningRoom" ? (
          <CurningRoom />
        ) : (
          <StoneBall />
        )}
      </PageTemplate>
    </Flex>
  );
}

export default App;

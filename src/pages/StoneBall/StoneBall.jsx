import CustomTabs from "../../components/Tabs/CustomTabs";
import StoneBallMonitoring from "./StonBallMonitoring";
import StoneBallLog from "./StoneBallLog";

const StoneBall = () => {
  return (
    <>
      <CustomTabs
        contents={[
          { label: "모니터링", component: <StoneBallMonitoring /> },
          { label: "조회", component: <StoneBallLog /> },
        ]}
      />
    </>
  );
};

export default StoneBall;

import { useEffect } from "react";

import { useLocation } from "../../contexts/useLocation";
import apiClient from "../../api/axios";
import CustomTabs from "../../components/Tabs/CustomTabs";
import CurningRoomMonitoring from "./CurningMonitoring";
import CurningRoomSetting from "./CurningRoomSetting";
import CurningRoomLog from "./CurningRoomLog";

const CurningRoom = () => {
  const { selectedLocation } = useLocation();

  useEffect(() => {
    (async () => {
      if (!selectedLocation) {
        return;
      }

      try {
        const response = await apiClient.get(
          `/api/curningRoom/${selectedLocation.id}`
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedLocation?.id]);

  return (
    <>
      <CustomTabs
        contents={[
          { label: "모니터링", component: <CurningRoomMonitoring /> },
          { label: "설정", component: <CurningRoomSetting /> },
          { label: "조회", component: <CurningRoomLog /> },
        ]}
      />
    </>
  );
};

export default CurningRoom;

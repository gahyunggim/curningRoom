import { useEffect, useState } from "react";
import { Flex, Layout } from "antd";

import apiClient from "../../api/axios";
import { useLocation } from "../../contexts/useLocation";
import CustomTable from "../../components/Table/CustomTable";
import CustomLineChart from "../../components/Table/CustomLineChart";

const columns = [
  {
    name: "온도 上",
    key: "temperature_high",
  },
  {
    name: "온도 中",
    key: "temperature_middle",
  },
  {
    name: "온도 下",
    key: "temperature_low",
  },
  {
    name: "온도 평균",
    key: "temperature_average",
  },
];

const StoneBallMonitoring = () => {
  const { selectedLocation } = useLocation();
  const [logData, setLogData] = useState([]);
  const [summaryData, setSummaryData] = useState([{}]);

  useEffect(() => {
    (async () => {
      if (!selectedLocation) {
        return;
      }

      try {
        const summaryResponse = await apiClient.get(
          `/api/stoneBall/monitoring/summary/${selectedLocation.id}`
        );

        setSummaryData([summaryResponse.data]);

        const logResponse = await apiClient.get(
          `/api/stoneBall/monitoring/log/${selectedLocation.id}`
        );

        setLogData(logResponse.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedLocation?.id]);

  return (
    <Flex vertical gap={60}>
      <CustomTable data={summaryData} columns={columns} />
      <Flex>
        <CustomLineChart data={logData} />
      </Flex>
    </Flex>
  );
};

export default StoneBallMonitoring;

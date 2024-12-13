import { Button, Flex, Space } from "antd";
import apiClient from "../../api/axios";
import CustomSelect from "../../components/Select/CustomSelect";
import DateTimeRangePicker from "../../components/DatePicker/DateTimeRangePicker";
import { useEffect, useState } from "react";
import { use } from "react";
import CustomTable from "../../components/Table/CustomTable";
import CustomLineChart from "../../components/Table/CustomLineChart";
import { useLocation } from "../../contexts/useLocation";

const columns = [
  {
    name: "측정 시간",
    key: "date",
  },
  {
    name: "양생실 이름",
    key: "name",
  },
  {
    name: "온도 上",
    key: "temperature",
  },
  {
    name: "온도 中",
    key: "temperature",
  },
  {
    name: "온도 下",
    key: "temperature",
  },
];

const StoneBallLog = () => {
  const { selectedLocation } = useLocation();

  const [dataView, setDataView] = useState("table");
  const [searchQuery, setSearchQuery] = useState({
    locationId: selectedLocation.id,
    startTime: null,
    endTime: null,
  });
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [logData, setLogData] = useState([]);

  const handleSearchQuery = (name, value) => {
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  useEffect(() => {
    if (!isFirstRender || !searchQuery.locationId) return;

    fetchLogs(searchQuery);

    setIsFirstRender(false);
  }, [selectedLocation.id]);

  const fetchStonBallList = async () => {
    try {
      const response = await apiClient.get("/api/stoneBall/list");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLogs = async (searchQuery) => {
    try {
      const response = await apiClient.get(
        `/api/stoneBall/log/${searchQuery.locationId}`
      );
      console.log(response.data);
      setLogData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataViewChange = (view) => {
    setDataView(view);
  };

  return (
    <Flex vertical gap={20}>
      <Flex gap={2}>
        <Space>
          <CustomSelect
            fetchData={fetchStonBallList}
            optionName={"name"}
            optionValue={"id"}
            handleSearchQuery={handleSearchQuery}
            label="locationId"
            defaultValue={selectedLocation.id}
          />
        </Space>
        <DateTimeRangePicker />
        <Button onClick={async () => await fetchLogs(searchQuery)}>검색</Button>
      </Flex>
      <Flex justify="flex-end" gap={12}>
        {dataView === "table" ? (
          <Button onClick={() => handleDataViewChange("chart")}>
            그래프 보기
          </Button>
        ) : (
          <Button onClick={() => handleDataViewChange("table")}>
            테이블 보기
          </Button>
        )}

        <Button>검색 결과 다운로드</Button>
      </Flex>
      {dataView === "table" && <CustomTable data={logData} columns={columns} />}
      {dataView === "chart" && <CustomLineChart data={logData} />}
    </Flex>
  );
};

export default StoneBallLog;

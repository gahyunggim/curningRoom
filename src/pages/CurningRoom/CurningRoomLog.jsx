import { useEffect, useState } from "react";
import { useLocation } from "../../contexts/useLocation";
import apiClient from "../../api/axios";
import { Button, Flex, Space } from "antd";
import CustomSelect from "../../components/Select/CustomSelect";
import DateTimeRangePicker from "../../components/DatePicker/DateTimeRangePicker";
import CustomTable from "../../components/Table/CustomTable";
import CustomLineChart from "../../components/Table/CustomLineChart";

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
    name: "설정 온도",
    key: "target_temperature",
  },
  {
    name: "설정 습도",
    key: "target_humidity",
  },
  {
    name: "측정 온도",
    key: "current_temperature",
  },
  {
    name: "측정 습도",
    key: "current_humidity",
  },
];

const CurningRoomLog = () => {
  const { selectedLocation } = useLocation();
  const [dataView, setDataView] = useState("table");
  const [searchQuery, setSearchQuery] = useState({
    locationId: selectedLocation.id,
    startTime: null,
    endTime: null,
  });
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    if (!isFirstRender || !searchQuery.locationId) return;

    fetchLogs(searchQuery);

    setIsFirstRender(false);
  }, [selectedLocation.id]);

  const handleSearchQuery = (name, value) => {
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const fetchCurningRoomList = async () => {
    try {
      const response = await apiClient.get("/api/curningRoom/list");
      console.log("test aa", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLogs = async (searchQuery) => {
    try {
      const response = await apiClient.get(
        `/api/curningRoom/log/${searchQuery.locationId}`
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

  const convertData = (data) => {
    if (data.length === 0) return [];

    console.log("확인", data);

    return data.reduce((acc, item) => {
      acc.push({
        date: item.date,
        category: "설정 온도",
        temperature: item.target_temperature,
      });
      acc.push({
        date: item.date,
        category: "설정 습도",
        temperature: item.target_humidity,
      });
      acc.push({
        date: item.date,
        category: "측정 온도",
        temperature: item.current_temperature,
      });
      acc.push({
        date: item.date,
        category: "측정 습도",
        temperature: item.current_humidity,
      });
      return acc;
    }, []);
  };

  return (
    <Flex vertical gap={20}>
      <Flex gap={2}>
        <Space>
          <CustomSelect
            fetchData={fetchCurningRoomList}
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
      {dataView === "chart" && <CustomLineChart data={convertData(logData)} />}
    </Flex>
  );
};

export default CurningRoomLog;

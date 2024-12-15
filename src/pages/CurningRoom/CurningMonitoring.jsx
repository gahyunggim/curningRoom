import { Flex, Space } from "antd";
import { useLocation } from "../../contexts/useLocation";
import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import Typography from "antd/es/typography/Typography";
import CustomTable from "../../components/Table/CustomTable";
import CustomLineChart from "../../components/Table/CustomLineChart";
import { initialCurningRoomsInfo } from "./mockingData";

const firstColumn = [
  {
    name: "동작 온도",
    key: "on_temperature",
  },
  {
    name: "정지 온도",
    key: "off_temperature",
  },
];

const secondColumn = [
  {
    name: "측정 온도",
    key: "current_temperature",
  },
  {
    name: "측정 습도",
    key: "current_humidity",
  },
  {
    name: "밸브 1",
    key: "valve_1",
  },
  {
    name: "밸브 2",
    key: "valve_2",
  },
];

const thirdColumn = [
  {
    name: "시간",
    key: "date",
  },
  {
    name: "제어 여부",
    key: "is_control",
  },
  {
    name: "온습도범위 이탈",
    key: "is_out",
  },
];

const CurningRoomMonitoring = () => {
  const { selectedLocation } = useLocation();
  const [curningRoomData, setCurningRoomData] = useState({});

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
        setCurningRoomData(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedLocation?.id]);

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
    <Flex flex={1} vertical gap={60}>
      <Flex justify="space-between">
        <Flex
          justify="center"
          align="center"
          style={{
            background: curningRoomData?.is_auto_control ? "#53c41a" : "red",
            width: 120,
            height: 60,
            borderRadius: 8,
            fontSize: 32,
          }}
        >
          {curningRoomData?.is_auto_control ? "ON" : "OFF"}
        </Flex>
        {
          <Flex
            justify="center"
            align="center"
            style={{
              width: 240,
              height: 60,
              borderRadius: 8,
              fontSize: 32,
              border: "1px solid #000",
            }}
          >
            자동 제어
          </Flex>
        }
      </Flex>
      {!curningRoomData?.is_auto_control && (
        <Flex
          justify="center"
          align="center"
          style={{
            border: "1px solid black",
            borderRadius: 4,
            height: 500,
            fontSize: 60,
          }}
          // flex={1}
        >
          가동 중이 아닙니다.
        </Flex>
      )}
      {curningRoomData?.is_auto_control && (
        <Flex
          justify="space-between"
          style={{ border: "1px solid black", padding: 12, borderRadius: 8 }}
        >
          <Typography style={{ fontSize: 24 }}>
            시작 시간 : 2024.12.05. 04:00
          </Typography>
          <Typography style={{ fontSize: 24 }}>자동 제어 중</Typography>
        </Flex>
      )}
      {curningRoomData?.is_auto_control && (
        <Flex gap={20}>
          <Flex flex={1}>
            <CustomTable
              data={[{ on_temperature: 38.0, off_temperature: 41.0 }]}
              columns={firstColumn}
            />
          </Flex>
          <Flex flex={2}>
            <CustomTable
              data={[
                {
                  current_temperature: 35.5,
                  current_humidity: 60,
                  valve_1: "ON",
                  valve_2: "OFF",
                },
              ]}
              columns={secondColumn}
            />
          </Flex>
        </Flex>
      )}
      {curningRoomData?.is_auto_control && (
        <CustomLineChart
          data={convertData(
            initialCurningRoomsInfo.filter((room) => room.id === 1)
          )}
        />
      )}
      {curningRoomData?.is_auto_control && (
        <CustomTable
          data={[
            {
              date: "2024.12.05 04:05",
              is_control: "Y",
              is_out: "N",
            },
            {
              date: "2024.12.05 04:04",
              is_control: "Y",
              is_out: "N",
            },
            {
              date: "2024.12.05 04:03",
              is_control: "Y",
              is_out: "N",
            },
            {
              date: "2024.12.05 04:02",
              is_control: "Y",
              is_out: "N",
            },
            {
              date: "2024.12.05 04:01",
              is_control: "Y",
              is_out: "N",
            },
          ]}
          columns={thirdColumn}
        />
      )}
    </Flex>
  );
};

export default CurningRoomMonitoring;

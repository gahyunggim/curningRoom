import { useEffect, useState } from "react";
import { useLocation } from "../../contexts/useLocation";
import apiClient from "../../api/axios";
import { Button, Flex, Typography } from "antd";
import DateTimePicker from "../../components/DatePicker/DateTimePicker";
import CustomTable from "../../components/Table/CustomTable";
import { initialSettingData } from "./mockingData";
import NumberKeypad from "../../components/Keypad/NumberKeypad";

const columns = [
  {
    name: "동작 시간",
    key: "time",
  },
  {
    name: "보일러 동작 온도",
    key: "boiler_on_temperature",
  },
  {
    name: "보일러 정지 온도",
    key: "boiler_off_temperature",
  },
];

const CurningRoomSetting = () => {
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

  return (
    <Flex flex={1} vertical gap={60}>
      <Flex justify="flex-end">
        {curningRoomData?.is_auto_control ? (
          <Flex
            vertical
            align="center"
            style={{ border: "1px solid black", padding: 8, borderRadius: 8 }}
          >
            <Typography style={{ fontSize: 32 }}>자동 제어 중</Typography>
            <Typography style={{ fontSize: 32 }}>수정 불가</Typography>
          </Flex>
        ) : (
          <Flex
            style={{ border: "1px solid black", padding: 8, borderRadius: 8 }}
          >
            <Typography style={{ fontSize: 32 }}>자동 제어 설정</Typography>
          </Flex>
        )}
      </Flex>
      <Flex gap={32}>
        <Flex flex={3} vertical gap={12}>
          <Flex justify="space-between" style={{ width: "100%" }}>
            <Flex align="center" gap={8}>
              <Typography style={{ fontSize: 18 }}>시작 시간 : </Typography>
              <DateTimePicker />
            </Flex>
            {!curningRoomData?.is_auto_control && (
              <Button style={{ background: "#1677ff", color: "white" }}>
                추가
              </Button>
            )}
          </Flex>
          <CustomTable columns={columns} data={initialSettingData} />
        </Flex>
        {!curningRoomData?.is_auto_control && (
          <Flex flex={1}>
            <NumberKeypad />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CurningRoomSetting;

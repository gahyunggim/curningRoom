import { Button, Flex } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

import { useLocation } from "../../contexts/useLocation";

const styles = {
  buttonIcon: {
    color: "#1677ff",
    fontSize: 120,
  },
  title: {
    width: 500,
    textAlign: "center",
    fontSize: 60,
  },
};

const LocationSelector = () => {
  const { selectedLocation, handlePrevLocation, handleNextLocation } =
    useLocation();

  return (
    <Flex align="center" justify="center" gap={12}>
      <Button
        icon={<CaretLeftOutlined style={styles.buttonIcon} />}
        onClick={handlePrevLocation}
        type="text"
      />
      <Title style={styles.title}>{selectedLocation.name}</Title>
      <Button
        icon={<CaretRightOutlined style={styles.buttonIcon} />}
        onClick={handleNextLocation}
        type="text"
      />
    </Flex>
  );
};

export default LocationSelector;

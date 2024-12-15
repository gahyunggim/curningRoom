import { Button, Flex } from "antd";

const CustomButton = ({ children }) => {
  return (
    <Button style={{ height: 120, fontSize: 56, width: 120 }} type="primary">
      {children}
    </Button>
  );
};

const NumberKeypad = () => {
  return (
    <Flex
      vertical
      style={{
        border: "1px solid #d2d2d2",
        padding: 12,
        width: "100%",
        borderRadius: 8,
        height: 520,
      }}
      gap={12}
    >
      <Flex gap={12} justify="space-between">
        <CustomButton>1</CustomButton>
        <CustomButton>2</CustomButton>
        <CustomButton>3</CustomButton>
      </Flex>
      <Flex gap={12} justify="space-between">
        <CustomButton>4</CustomButton>
        <CustomButton>5</CustomButton>
        <CustomButton>6</CustomButton>
      </Flex>
      <Flex gap={12} justify="space-between">
        <CustomButton>7</CustomButton>
        <CustomButton>8</CustomButton>
        <CustomButton>9</CustomButton>
      </Flex>
      <Flex gap={12} justify="center">
        <CustomButton>0</CustomButton>
      </Flex>
    </Flex>
  );
};

export default NumberKeypad;

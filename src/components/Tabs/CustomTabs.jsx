import { Flex, Tabs } from "antd";

const CustomTabs = ({ contents }) => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Flex vertical style={{ width: "100%" }} flex={1}>
      <Tabs
        onChange={onChange}
        type="card"
        size={"large"}
        items={contents.map((content, index) => ({
          ...content,
          key: String(index + 1),
          children: content.component,
        }))}
      />
    </Flex>
  );
};

export default CustomTabs;

import { Tabs } from "antd";

const CustomTabs = ({ contents }) => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
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
  );
};

export default CustomTabs;

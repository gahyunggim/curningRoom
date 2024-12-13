import { Flex, Layout } from "antd";

import LocationSelector from "../Selector/LocationSelector";

const PageTemplate = ({ children }) => {
  return (
    <Flex
      vertical
      style={{ padding: 80, background: "white", height: "100vh" }}
    >
      <LocationSelector />
      {children}
    </Flex>
  );
};

export default PageTemplate;

import { Flex, Layout } from "antd";

import LocationSelector from "../Selector/LocationSelector";

const PageTemplate = ({ children }) => {
  return (
    <Flex
      vertical
      style={{
        padding: 80,
      }}
      flex={1}
    >
      <LocationSelector />
      <Flex flex={1} vertical>
        {children}
      </Flex>
    </Flex>
  );
};

export default PageTemplate;

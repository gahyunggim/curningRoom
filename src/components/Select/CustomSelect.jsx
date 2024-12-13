import { Select } from "antd";
import { useEffect, useState } from "react";

const CustomSelect = ({
  fetchData,
  optionName,
  optionValue,
  handleSearchQuery,
  label,
  defaultValue = 0,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchData();
        setOptions(
          result?.map((item) => ({
            label: item[optionName],
            value: item[optionValue],
          }))
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleValue = (value) => {
    setValue(value);
    handleSearchQuery(label, value);
  };

  return (
    <Select options={options} onChange={handleValue} value={value}></Select>
  );
};

export default CustomSelect;

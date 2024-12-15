import { DatePicker } from "antd";
import dayjs from "dayjs";

const DateTimePicker = () => {
  return (
    <DatePicker
      showTime
      placeholder={"시작 시간"}
      defaultValue={dayjs("2024-12-16", "YYYY-MM-DD")}
    />
  );
};

export default DateTimePicker;

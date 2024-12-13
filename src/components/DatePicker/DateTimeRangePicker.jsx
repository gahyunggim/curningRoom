import { DatePicker } from "antd";

const DateTimeRangePicker = () => {
  return (
    <DatePicker.RangePicker showTime placeholder={["시작 시간", "종료 시간"]} />
  );
};

export default DateTimeRangePicker;

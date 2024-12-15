import { Line } from "@ant-design/plots";

const CustomLineChart = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "temperature",
    // colorField: "type",
    xAxis: {
      // x축 레이블 간격 조정
      tickInterval: 3, // 3배수 간격으로 레이블 표시
      // 또는 tickCount를 사용할 수 있음
      // tickCount: Math.ceil(data.length / 5), // 전체 데이터 대비 5등분으로 간격 표시
      tickCount: 5,
    },
    axis: {
      x: {
        tickInterval: 6,
        tickCount: 5,
      },
      //   y: {
      //     labelFormatter: (v) =>
      //       `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      //   },
    },
    // scale: { color: { range: ["#30BF78", "#F4664A", "#FAAD14"] } },
    style: {
      lineWidth: 2,
      //   lineDash: (data) => {
      //     if (data[0].type === "register") return [4, 4];
      //   },
      //   opacity: (data) => {
      //     if (data[0].type !== "register") return 0.5;
      //   },
    },
    colorField: "category",
  };

  return <Line {...config} />;
};

export default CustomLineChart;

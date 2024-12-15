import { Table } from "antd";

const CustomTable = ({ data, columns }) => {
  const convertedColumns = columns.map((column) => {
    return {
      title: column.name,
      dataIndex: column.key,
      key: column.key,
      align: "center",
    };
  });

  return (
    <Table
      dataSource={data}
      columns={convertedColumns}
      pagination={false}
      bordered
      style={{ width: "100%" }}
    />
  );
};

export default CustomTable;

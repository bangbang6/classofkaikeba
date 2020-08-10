import React from "react";
import { connect } from "dva";
import { Table } from "antd";
export default connect((state) => ({ state }))(function Example(props) {
  let columns = [
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "年龄", dataIndex: "age", key: "age" },
    { title: "住址", dataIndex: "city", key: "city" },
  ];
  console.log(props);
  function dataSearch() {}
  return (
    <div>
      <button onClick={dataSearch}>search</button>
      <Table columns={columns} dataSource={props.state.example.data}></Table>
    </div>
  );
});

import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, Card, Table } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect } from 'umi';
import styles from './index.less';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];

// UI层和数据层分开
class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 1 };
  }

  componentDidMount() {
    this.props.getProductData({ name: '', current: 1 });
  }

  render() {
    //const { data } = this.props.more;
    let { more, getProductData } = this.props;
    console.log(more);
    //暗号:"中非"
    return (
      <ProTable
        size="small"
        columns={columns}
        request={() => ({
          data: more.data,
          success: true,
        })}
        pagination={{
          //simple: true,
          current: more.current,
          total: more.total,
          pageSize: more.pageSize,
          onChange: current => {
            getProductData({ name: '', current: current });
          },
        }}
      />
    );
  }
}

export default connect(
  // mapStateToProps
  ({ more }) => ({ more }),
  // mapDispatchToProps
  {
    getProductData: values => ({
      type: 'more/getProductData',
      payload: values,
    }),
    // getMoreDataBySearch: values => ({
    //   type: 'more/getMoreDataBySearch',
    //   payload: values,
    // }),
  },
)(More);

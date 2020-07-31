import React, { Component } from 'react'
import { connect } from './kReactRedux'
import { bindActionCreators } from './kReactRedux'
class ReactReduxPage extends Component {
  render() {
    let { dispatch, add, minus, count } = this.props
    console.log(this.props)
    return (
      <div>
        <p>{count}</p>
        <button onClick={() => add()}>add</button>
        <button onClick={() => minus()}>minus</button>
        <button onClick={() => dispatch({ type: 'add', payload: 10 })}>
          dispatch
        </button>
      </div>
    )
  }
}
let mapStateToProps = (state) => {
  return { count: state.count }
}
let mapDispatchToProps = (dispatch) => {
  let creators = {
    add: () => ({ type: 'add' }),
    minus: () => ({ type: 'minus' }),
  }

  creators = bindActionCreators(creators, dispatch)
  return {
    dispatch, //让props有dispatch
    ...creators,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage)

/* import React, { Component } from 'react'
import { ThemeContext } from './Context'
export default class HomePage extends Component {
  static contextType = ThemeContext //接收

  render() {
    console.log(this)
    return <div style={{ color: this.context }}>homepage</div>
  }
} */
import React, { useContext } from 'react'
import { ThemeContext, ThemeConsumer, UserConsumer } from './Context'
//三种方式 useContext(只能用于函数式组件，或者自定义hook中) contextType(只能用一次且只能用于类组件) consumer(需要嵌套)
export default function HomePage(props) {
  //函数组件没有this 然而context是在this里面有context data props
  //const ctx = useContext(ThemeContext) //接受

  /* return <div style={{ color: ctx }}>homePage</div> */
  return (
    <div>
      <ThemeConsumer>
        {/* //themeContext就是传入的value */}
        {(themeContext) => {
          console.log(themeContext)
          return (
            <div style={{ color: themeContext }}>
              pmg{' '}
              <UserConsumer>
                {(userContext) => <div>my name is {userContext}</div>}
              </UserConsumer>
            </div>
          )
        }}
      </ThemeConsumer>
    </div>
  )
}

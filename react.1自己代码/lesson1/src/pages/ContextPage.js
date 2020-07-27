import React, { useState } from 'react'
import HomePage from './HomePage'
import { ThemeProvider, UserProvider } from './Context'

export default function ContextPage() {
  let [themeColor, setThemeColor] = useState('red')
  const [username, setusername] = useState('小米')
  return (
    <div>
      <ThemeProvider value={themeColor}>
        <UserProvider value={username}>
          {' '}
          {/* //数据放在value 组件吗必须大写*/}
          <HomePage color={themeColor} />
        </UserProvider>
      </ThemeProvider>
    </div>
  )
}

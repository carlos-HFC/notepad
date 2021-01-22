import { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import { AddNote, Login, MyNotes } from './pages'
import { Header } from './components'
import { isAuth } from './services/auth'

import { dark, light } from './css/themes'
import GlobalStyle from './css/styles'

function Private({ ...props }) {
  const [theme, setTheme] = useState<DefaultTheme>(JSON.parse(localStorage.getItem("THEME") as string) || light)

  useEffect(() => localStorage.setItem("THEME", JSON.stringify(theme)), [theme])

  const handleTheme = () => setTheme(theme.title === 'light' ? dark : light)

  if (!isAuth()) return <Redirect to={{ pathname: "/", state: props.location }} />

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header handleTheme={handleTheme} />
      <Route path="/note" component={AddNote} />
      <Route path="/mynote" component={MyNotes} />
      <Route path="/profile" component={MyNotes} />
    </ThemeProvider>
  )
}

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Private />
    </Switch>
  )
}

export default Routes
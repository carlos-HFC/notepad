import { useEffect, useState } from 'react'
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import { Header } from 'components'
import { AddNote, Login, MyNotes, Profile } from 'pages'
import { isAuth } from 'services/auth'

import { dark, light } from 'css/themes'
import GlobalStyle from 'css/styles'

function Private(props: RouteProps) {
  const [theme, setTheme] = useState<DefaultTheme>(JSON.parse(localStorage.getItem("THEME_NOTE") as string) || dark)

  useEffect(() => localStorage.setItem("THEME_NOTE", JSON.stringify(theme)), [theme])

  const handleTheme = () => setTheme(theme.title === 'light' ? dark : light)

  if (!isAuth()) return <Redirect to={{ pathname: "/", state: props.location }} />

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header handleTheme={handleTheme} />
      <Route path="/note" component={AddNote} />
      <Route path="/mynote" component={MyNotes} />
      <Route path="/profile" component={Profile} />
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
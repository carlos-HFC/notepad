import { useContext } from 'react'
import { Dropdown, Nav, Navbar } from 'react-bootstrap'
import { FaIdCard, FaStickyNote, FaUserCircle } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'

import { logout } from 'services/auth'

const Switch = styled.label`
  display: inline-block;
  height: 15px;
  margin-bottom: 0;
  position: relative;
  width: 50px;

  @media screen and (max-width: 767px) {
    margin: 5px 0
  }
`

const SliderRound = styled.span`
  background: #fff;
  border-radius: 30px;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .2s;

  &::before {
    background: #aaa;
    border-radius: 50%;
    bottom: -3.5px;
    content: "";
    height: 22px;
    left: 0;
    position: absolute;
    transition: .2s;
    width: 22px;
  }
`

const Check = styled.input.attrs({ type: "checkbox" })`
  height: 0;
  opacity: 0;
  width: 0;

  &:checked + ${SliderRound} {
    background: #000;

    &::before {
      transform: translateX(30px)
    }
  }

  &:focus + ${SliderRound} {
    box-shadow: 0 0 1px #000
  }
`

interface HeaderProps {
  handleTheme: (theme: string) => void
}

const Header: React.FC<HeaderProps> = ({ handleTheme }) => {
  const { title } = useContext(ThemeContext)
  const history = useHistory()

  return (
    <header>
      <div className="container">
        <Navbar expand="md">
          <Navbar.Brand title="NOTEPAD">
            NOTEPAD <FaStickyNote />
          </Navbar.Brand>
          <Navbar.Toggle>
            <div />
            <div />
            <div />
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className="align-items-md-center ml-auto" activeKey={history.location.pathname}>
              <NavLink className="nav-link" title="Adicionar Nota" to="note">Adicionar Nota</NavLink>
              <NavLink className="nav-link" title="Minhas Notas" to="mynote">Minhas Notas</NavLink>
              <Dropdown as="div" navbar alignRight>
                <Dropdown.Toggle as="a" role="button" className="nav-link">
                  <FaUserCircle size={35} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <LinkContainer to="/profile" title="Perfil">
                    <Dropdown.Item>
                      <FaIdCard className="mr-2" />Perfil
                    </Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Item onClick={logout} title="Sair">
                    <FiLogOut className="mr-2" />Sair
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Switch title={`${title.charAt(0).toUpperCase() + title.slice(1)} Mode`}>
                {title === 'light'
                  ? <Check onClick={() => handleTheme("light")} />
                  : <Check onClick={() => handleTheme("dark")} defaultChecked />
                }
                <SliderRound />
              </Switch>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  )
}

export default Header

import styled, { ThemeContext } from 'styled-components'
import { useContext } from 'react'
import { FaIdCard, FaStickyNote, FaUserCircle } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { NavLink, useHistory } from 'react-router-dom'
import { Nav, Navbar, Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../services/auth'

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 15px;
  margin-bottom: 0;

  @media screen and (max-width: 767px) {
    margin-top: 5px
  }
`

const SliderRound = styled.span`
  background: #fff;
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transition: .2s;
  border-radius: 30px;

  &::before {
    content: "";
    position: absolute;
    height: 22px;
    width: 22px;
    left: 0;
    bottom: -3.5px;
    background: #aaa;
    transition: .2s;
    border-radius: 50%;
  }
`

const Check = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;

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

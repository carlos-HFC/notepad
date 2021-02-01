import { FormEvent, useContext, useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Modal } from 'react-bootstrap'

import { IUser } from '../@types'
import { Button, InputBlock, Loader, Page, Perfil } from '../components'
import { notification } from '../utils'
import { logout } from '../services/auth'
import api from '../services/api'

const initialState = {
  name: "",
  email: "",
  oldPass: "",
  password: "",
  confirmPass: "",
}

export default function Profile() {
  const [load, setLoad] = useState(false)
  const [modal, setModal] = useState(false)
  const [user, setUser] = useState<IUser>()
  const [edit, setEdit] = useState(initialState)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => api.get('/users/profile').then(res => setUser(res.data)) // PEGAR USUÁRIO LOGADO

  function handleModal() { // TOGGLE MODAL
    setModal(modal => !modal)
    // SE O MODAL APARECE, COLOCA OS DADOS DO STATE, SENÃO, APAGA OS DADOS DO STATE
    if (!modal) setEdit({ ...edit, name: String(user?.name), email: String(user?.email) })
    else setEdit(initialState)
  }

  async function handleEdit(e: FormEvent) { // EDITAR CONTA
    e.preventDefault() // PREVENIR COMPORTAMENTO PADRÃO
    const { name, email, oldPass, password, confirmPass } = edit

    setLoad(true)
    try {
      const response = await api.put('/users', {
        name: name.trim(),
        email: email.trim(),
        oldPass: oldPass.trim(),
        password: password.trim(),
        confirmPass: confirmPass.trim(),
      }) // ENVIAR DADOS

      if (user?.email !== edit.email || edit.password) return logout() // SE ATUALIZAR O E-MAIL OU A SENHA, EFETUA LOGOUT

      setLoad(false)
      notification('success', 'success', response.data.message) // MENSAGEM DE SUCESSO
      setModal(false) // FECHAR MODAL
      return getUser() // PUXAR O USUÁRIO ATUALIZADO
    } catch (error) {
      setLoad(false)
      return notification('danger', 'error', error.response.data.message) // MENSAGEM DE ERRO
    }
  }

  return (
    <>
      <Loader loading={load} />
      <Modal show={modal} onHide={handleModal} centered>
        <Modal.Header>
          <Modal.Title title="Editar perfil">Editar Perfil</Modal.Title>
        </Modal.Header>
        <form className="container" onSubmit={handleEdit} autoComplete="off">
          <Modal.Body>
            <InputBlock label="Nome" id="EditNome" name="name" title="Nome"
              defaultValue={user?.name} onChange={e => setEdit({ ...edit, name: e.target.value })}
            />
            <InputBlock label="E-mail" id="EditEmail" name="email" type="email" title="E-mail"
              defaultValue={user?.email} onChange={e => setEdit({ ...edit, email: e.target.value })}
            />
            <InputBlock label="Senha atual" id="EditOldPass" name="oldPass" pass title="Senha atual"
              value={edit.oldPass} onChange={e => setEdit({ ...edit, oldPass: e.target.value })}
            />
            <InputBlock label="Nova senha" id="EditPassword" name="password" pass title="Nova senha"
              value={edit.password} onChange={e => setEdit({ ...edit, password: e.target.value })}
            />
            <InputBlock label="Confirmar senha" id="EditConfirm" name="confirmPass" pass title="Confirmar senha"
              value={edit.confirmPass} onChange={e => setEdit({ ...edit, confirmPass: e.target.value })}
            />
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-end">
            <Button background="green" label="Confirmar" type="submit" title="Confirmar" />
            <Button background="red" label="Cancelar" type="reset" title="Cancelar"
              onClick={handleModal}
            />
          </Modal.Footer>
        </form>
      </Modal>
      <Page title="Perfil">
        <Perfil>
          <div>
            <div className="img-profile" title="Imagem de perfil">
              <FaUserCircle size={150} />
            </div>
            <ul>
              <li title={`Nome: ${user?.name}`}>
                <span>Nome: </span> {user?.name}
              </li>
              <li title={`E-mail: ${user?.email}`}>
                <span>E-mail: </span> {user?.email}
              </li>
            </ul>
          </div>
          <div className="d-flex">
            <Button background="yellow" label="Editar" title="Editar perfil"
              onClick={handleModal}
            />
          </div>
        </Perfil>
      </Page>
    </>
  )
}

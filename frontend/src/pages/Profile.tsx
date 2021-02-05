import { FormEvent, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa'

import { IUser } from '@types'
import { Button, InputBlock, Loader, Page, Perfil } from 'components'
import { logout } from 'services/auth'
import api from 'services/api'
import { confirmation, notification } from 'utils'

const initialState = {
  name: "",
  email: "",
  oldPass: "",
  password: "",
  confirmPass: "",
}

export default function Profile() {
  const [edit, setEdit] = useState(initialState) // DADOS DE EDIÇÃO DA CONTA
  const [load, setLoad] = useState(false) // LOADER
  const [modal, setModal] = useState(false) // MODAL
  const [user, setUser] = useState<IUser>() // DADOS DO USUÁRIO

  useEffect(() => {
    getUser()
  }, [])

  async function excludeAccount() {
    try {
      const question = await confirmation('Tem certeza que deseja inativar a conta?', 'Essa ação só poderá ser desfeita em uma semana', 'Sim, inativar conta', 'Não, não inativar conta')

      if (question.isConfirmed) {
        setLoad(true)
        await api.delete('/users')
        setLoad(false)
        return logout()
      }
    } catch (error) {
      setLoad(false)
      return notification('danger', 'error', error.response.data.message)
    }
  }

  const getUser = () => api.get('/users/profile').then(res => setUser(res.data)) // PEGAR USUÁRIO LOGADO

  async function handleEdit(e: FormEvent) { // EDITAR CONTA
    e.preventDefault() // PREVENIR COMPORTAMENTO PADRÃO
    const { name, email, oldPass, password, confirmPass } = edit

    setLoad(true)
    try {
      // ENVIAR DADOS
      const response = await api.put('/users', {
        name: name.trim(),
        email: email.trim(),
        oldPass: oldPass.trim(),
        password: password.trim(),
        confirmPass: confirmPass.trim(),
      })

      // SE ATUALIZAR O E-MAIL OU A SENHA, EFETUA LOGOUT
      if (user?.email !== edit.email || edit.password) {
        notification('success', 'success', response.data.message)
        return setTimeout(() => logout(), 1500)
      }

      setLoad(false)
      notification('success', 'success', response.data.message) // MENSAGEM DE SUCESSO
      setModal(false)
      return getUser() // PUXAR O USUÁRIO ATUALIZADO
    } catch (error) {
      setLoad(false)
      return notification('danger', 'error', error.response.data.message) // MENSAGEM DE ERRO
    }
  }

  function handleModal() { // TOGGLE MODAL
    setModal(modal => !modal)
    // SE O MODAL APARECE, COLOCA OS DADOS DO STATE, SENÃO, APAGA OS DADOS DO STATE
    if (!modal) setEdit({ ...edit, name: String(user?.name), email: String(user?.email) })
    else setEdit(initialState)
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
            <Button background="yellow" label={<FaEdit />} title="Editar perfil"
              onClick={handleModal}
            />
            <Button background="red" label={<FaTrash />} title="Inativar conta" className="ml-2"
              onClick={excludeAccount}
            />
          </div>
        </Perfil>
      </Page>
    </>
  )
}

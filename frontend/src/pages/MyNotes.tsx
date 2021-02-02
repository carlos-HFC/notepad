import { FormEvent, useEffect, useState } from "react"
import { FaTimesCircle } from "react-icons/fa"
import { Modal } from "react-bootstrap"

import { INotes } from "../@types"
import { Button, Loader, Page } from '../components'
import { confirmation, notification } from "../utils"
import api from "../services/api"

const initialState = {
  title: "",
  description: ""
}

function MyNotes() {
  const [notes, setNotes] = useState<INotes[]>([]) // NOTAS
  const [load, setLoad] = useState(false) // LOADER
  const [modal, setModal] = useState(false) // MODAL
  const [nota, setNota] = useState<INotes | undefined>() // NOTA CLICADA
  const [edit, setEdit] = useState(false) // FORMULÁRIO DE EDIÇÃO
  const [editNote, setEditNote] = useState(initialState) // DADOS DE EDIÇÃO

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => api.get("/notes").then(response => setNotes(response.data)) // PEGAR TODAS AS NOTAS

  function closeModal() { // FECHAR MODAL
    setModal(false)
    setEdit(false)
  }

  function openNote(id: number) { // ABRIR MODAL COM A NOTA CLICADA
    setLoad(true)
    setEdit(false)
    api.get(`/notes/${id}`) // PEGAR A NOTA PELO ID
      .then(res => {
        setModal(true)
        setNota(res.data)
        setLoad(false)
      })
  }

  async function handleEditNote(e: FormEvent) { // EDITAR A NOTA
    e.preventDefault() // PREVENIR COMPORTAMENTO PADRÃO

    setLoad(true)
    try {
      // ENVIAR OS DADOS EDITADOS A PARTIR DO ID
      const response = await api.put(`/notes/${nota?.id}`, {
        title: editNote.title ? editNote.title : nota?.title,
        description: editNote.description ? editNote.description : nota?.description
      })

      setLoad(false)
      notification('success', 'success', response.data.message) // MENSAGEM DE SUCESSO
      setEditNote(initialState)
      setModal(false)
      return getNotes() // ATUALIZAR AS NOTAS
    } catch (error) {
      setLoad(false)
      return notification('danger', 'error', error.response.data.message) // MENSAGEM DE ERRO
    }
  }

  async function removeNote(id: number) { // EXCLUIR NOTA
    try {
      // CONFIRMAR A EXCLUSÃO DA NOTA
      const question = await confirmation('Tem certeza que deseja excluir essa nota?', 'Essa ação não poderá ser desfeita', 'Sim, deletar nota', 'Não, não deletar nota')

      // SE CLICAR EM SIM
      if (question.isConfirmed) {
        setLoad(true)
        const response = await api.delete(`/notes/${id}`) // EXCLUIR NOTA A PARTIR DO ID
        notification('success', 'success', response.data.message) // MENSAGEM DE SUCESSO
      }
      setLoad(false)
      return getNotes() // ATUALIZAR NOTAS
    } catch (error) {
      setLoad(false)
      return notification('danger', 'error', error.response.data.message) // MENSAGEM DE ERRO
    }
  }

  return (
    <>
      <Loader loading={load} />
      <Modal show={modal} onHide={closeModal} centered>
        {!edit
          ? (
            <>
              <Modal.Header>
                <Modal.Title title="Título da nota">{nota?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body title="Descrição da nota" className="text-justify">
                {nota?.description}
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-end">
                <Button background="yellow" title="Editar" label="Editar" onClick={() => setEdit(true)} />
              </Modal.Footer>
            </>
          ) : (
            <form onSubmit={handleEditNote} autoComplete="off">
              <Modal.Header>
                <Modal.Title title={nota?.title} className="w-100">
                  <input type="text" className="form-control" name="Título" title={nota?.title}
                    defaultValue={nota?.title} onChange={e => setEditNote({ ...editNote, title: e.target.value })}
                  />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea name="Descrição" className="form-control" rows={10} title={nota?.description}
                  defaultValue={nota?.description} onChange={e => setEditNote({ ...editNote, description: e.target.value })}
                />
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-end">
                <Button background="green" title="Confirmar" label="Confirmar" type="submit" />
                <Button background="red" title="Cancelar" label="Cancelar" onClick={() => setEdit(false)} />
              </Modal.Footer>
            </form>
          )
        }
      </Modal>
      <Page title="Minhas notas">
        <div className="d-flex justify-content-center">
          {!notes.length
            ? (
              <div className="d-flex justify-content-center">
                <h3 className="text-center">Você não tem notas</h3>
              </div>
            ) : (
              <ul className="notes">
                {notes.map(note => (
                  <li key={note.id}>
                    <span onClick={() => removeNote(note.id)}>
                      <FaTimesCircle color="#c0392b" size={25} />
                    </span>
                    <div onClick={() => openNote(note.id)}>
                      <h2>{note.title}</h2>
                      <p>{note.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )
          }
        </div>
      </Page>
    </>
  )
}

export default MyNotes

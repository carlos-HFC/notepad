import { FormEvent, useEffect, useState } from "react"
import { FaTimesCircle } from "react-icons/fa"
import { Modal } from "react-bootstrap"

import { INotes } from "../@types"
import { Button, Loader, Page } from '../components'
import { notification } from "../utils"
import api from "../services/api"

const initialState = {
  title: "",
  description: ""
}

function MyNotes() {
  const [notes, setNotes] = useState<INotes[]>([])
  const [load, setLoad] = useState(false)
  const [modal, setModal] = useState(false)
  const [nota, setNota] = useState<INotes | undefined>()
  const [edit, setEdit] = useState(false)
  const [editNote, setEditNote] = useState(initialState)

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => api.get("/notes").then(response => setNotes(response.data))

  function closeModal() {
    setModal(false)
    setEdit(false)
  }

  function openNote(id: number) {
    setLoad(true)
    setEdit(false)
    api.get(`/notes/${id}`)
      .then(res => {
        setModal(true)
        setNota(res.data)
        setLoad(false)
      })
  }

  async function handleEditNote(e: FormEvent) {
    e.preventDefault()

    setLoad(true)
    try {
      const response = await api.put(`/notes/${nota?.id}`, {
        title: editNote.title,
        description: editNote.description
      })

      setLoad(false)
      notification('success', 'success', response.data.message)
      setEditNote(initialState)
      setModal(false)
      return getNotes()
    } catch (error) {
      setLoad(false)
      return notification('danger', 'error', error.response.data.message)
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
                  <li key={note.id} onClick={() => openNote(note.id)}>
                    <span>
                      <FaTimesCircle color="red" size={20} />
                    </span>
                    <h2>{note.title}</h2>
                    <p>{note.description}</p>
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

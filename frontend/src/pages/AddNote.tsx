import { FormEvent, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import { Button, Loader, Page } from '../components'
import { notification } from '../utils'
import api from '../services/api'

const initialState = {
  title: "",
  description: ""
}

function AddNote() {
  const [load, setLoad] = useState(false)
  const [note, setNote] = useState(initialState)

  async function handleSubmit(e: FormEvent) { // CADASTRAR NOTA
    e.preventDefault() // PREVENIR COMPORTAMENTO PADRÃO

    // CASO HAJA CAMPO EM BRANCO
    if (Object.values(note).some(item => !item.trim())) return notification('danger', 'error', 'Preencha todos os campos!!')

    setLoad(true)
    try {
      const response = await api.post("/notes", { ...note }) // ENVIAR OS DADOS

      setLoad(false)
      notification('success', 'success', response.data.message) // MENSAGEM DE SUCESSO

      return setTimeout(() => setNote(initialState), 1500) // LIMPAR OS CAMPOS
    } catch (err) {
      setLoad(false)
      return notification('danger', 'error', 'Erro inesperado!!') // MENSAGEM DE ERRO
    }
  }

  return (
    <>
      <Loader loading={load} />
      <Page title="Insira suas notas">
        <form className="col-lg-9 col-12 mx-auto" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <label htmlFor="Título" className="col-form-label" title="Insira o título da nota">Título</label>
              <input name="Título" className="form-control mb-2" id="Título" title="Insira o título da nota" minLength={1} autoComplete="off"
                value={note.title} onChange={e => setNote({ ...note, title: e.target.value })}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <label htmlFor="Descrição" className="col-form-label" title="Insira uma descrição para a nota">Descrição</label>
              <textarea name="Descrição" id="Descrição" rows={5} className="form-control"
                value={note.description} onChange={e => setNote({ ...note, description: e.target.value })}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mb-3">
            <Button background="green" title="Adicionar nota" className="mb-2 my-btn"
              label={<><FaPlusCircle className="mr-2" />Adicionar</>}
            />
          </div>
        </form>
      </Page>
    </>
  )
}

export default AddNote
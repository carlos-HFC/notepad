import { FormEvent, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { Editor } from '@tinymce/tinymce-react'

import { Button, Loader, Page } from '../components'
import { notification } from '../utils'
import api from '../services/api'

const options = {
  height: 200,
  language: "pt_BR",
  statusbar: false,
  toolbar_mode: "floating",
  toolbar: "undo redo | styleselect | fontselect | bold italic underline | alignleft aligncenter alignright alignjustify",
  content_style: "@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');body{font-family:Quicksand}",
  font_formats: "Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Quicksand=quicksand; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva;"
}

const initialState = {
  title: "",
  description: ""
}

function AddNote() {
  const [load, setLoad] = useState(false)
  const [note, setNote] = useState(initialState)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (Object.values(note).some(item => !item.trim())) return notification('danger', 'error', 'Preencha todos os campos!!')

    setLoad(true)
    try {
      const response = await api.post("/todos", { ...note })

      setLoad(false)
      notification('success', 'success', response.data.message)

      return setTimeout(() => setNote(initialState), 1500)
    } catch (err) {
      setLoad(false)
      return notification('danger', 'error', 'Erro inesperado!!')
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
              <input type="text" className="form-control mb-2" id="Título" title="Insira o título da nota" minLength={1} autoComplete="off"
                value={note.title} onChange={e => setNote({ ...note, title: e.target.value })}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <label htmlFor="Descrição" className="col-form-label" title="Insira uma descrição para a nota">Descrição</label>
              <Editor apiKey={process.env.REACT_APP_TINYMCE_KEY} id="Descrição" init={options as any}
                value={note.description} onEditorChange={e => setNote({ ...note, description: e })}
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
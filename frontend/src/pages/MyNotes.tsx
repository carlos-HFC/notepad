import { useEffect, useState } from "react"

import { Loader, Page } from '../components'
import { Notes } from "../@types"
import api from "../services/api"

function MyNotes() {
  const [load, setLoad] = useState(false)
  const [notes, setNotes] = useState<Notes[]>([])

  useEffect(() => {
    api.get("/todos")
      .then(response => setNotes(response.data))
  }, [])

  return (
    <>
      <Loader loading={load} />
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
                    <h2>{note.title}</h2>
                    <span dangerouslySetInnerHTML={{__html: note.description}}></span>
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

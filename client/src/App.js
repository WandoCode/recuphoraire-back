import DataManager from './factories/DataManager.js'
import { useEffect, useState } from 'react'
import Layout from './composant/Layout.js'
import Select from './composant/Select.js'
import TableHoraire from './composant/TableHoraire.js'

function App() {
  const [datas, setDatas] = useState({})
  const [names, setNames] = useState([])
  const [currentName, setCurrentName] = useState('')

  const dataManager = new DataManager()

  useEffect(() => {
    const fetchDatas = async () => {
      const datasRaw = await dataManager.getRawDatasAllSheets()
      dataManager.createStructuredDatas(datasRaw)

      const formattedDatas = dataManager.formattedDatas
      setDatas(formattedDatas)
    }
    fetchDatas()
  }, [])

  useEffect(() => {
    const newNames = Object.keys(datas)
    setNames(newNames)
    setCurrentName(newNames[0])
  }, [datas])

  const getName = (name) => {
    setCurrentName(name)
  }

  return (
    <div className="App">
      <Layout title="Horaire Delta">
        <Select names={names} getName={getName} />
        <TableHoraire name={currentName} datas={datas} />
      </Layout>
    </div>
  )
}
// TODO: ajouter les congés

export default App

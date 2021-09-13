import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import TwitForm from './components/TwitForm'
import TwitInfoList from './components/TwitInfoList';

function App() {
  const [id, setId] = useState(0)
  const [information, setInfo] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setError(null)
        setInfo(null)
        setLoading(true)
        const res = await axios.get('http://localhost:3001/projects/02/API/v1/getData')
        setInfo(res.data)

        setId(findLastId(res.data))
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }
    fetchInfo()
  }, [])

  const findLastId = (data) => {
    let lastId = -1
    for (let i=0; i < data.length; i++){
      if (data[i].id > lastId){
        lastId = data[i].id
      }
    }
    return lastId
  }

  const addData = (data) => {
    setInfo(information.concat({ id: id+1, ...data }))
    setId(id+1)
  }
  const removeData = (id) => {
    setInfo(information.filter(info => info.id !== id))
  }
  const updateData = (id, data) => {
    setInfo(information.map(info => id === info.id ? { ...info, ...data } : info))
  }
  const handleChange = (e) => {
    setKeyword(e.target.value)
  }


  if (loading) return <div>Now Loading...</div>
  if (error) return <div>Error!</div>
  if (information !== null) {
    console.log(information)
    const filteredInfo = information.filter(
      info => {
        return info.name.indexOf(keyword) !== -1 || info.text.indexOf(keyword) !== -1
      }
    )

    return (
      <div>
        <div>
          <TwitForm addData={addData} />
        </div>
        <p>
          <input 
            placeholder="Search by a writer or text" 
            onChange={handleChange}
            value={keyword}
          />
        </p>
        <TwitInfoList data={filteredInfo} removeData={removeData} updateData={updateData} />
      </div>
    )
  } else {
    return <div>Initial Screen</div>
  }
  
}

export default App;

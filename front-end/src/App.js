import { useState, useEffect } from 'react'
import { Input } from '@material-ui/core'
import axios from 'axios'
import './App.css'
import TwitForm from './components/TwitForm'
import TwitInfoList from './components/TwitInfoList'


function App() {
  const [id, setId] = useState(0)
  const [information, setInfo] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const endPoint = "https://lucaswgong.com/projects/02/API/v1/twits"
  // const endPoint = "http://localhost:3001/projects/02/API/v1/twits"
  const style = {
    padding: '1px',
    margin: '15px'
  }
 
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setError(null)
        setLoading(true)
        const res = await axios.get(endPoint)
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
    if (!data) console.log("data - " +data)
    setInfo(information.concat({ id: id+1, ...data }))
    setId(id+1)    
    axios.post(endPoint, {
      id: id+1,
      name: data.name,
      time: data.time,
      text: data.text     
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  const updateData = (id, data) => {
    setInfo(information.map(info => id === info.id ? { ...info, ...data } : info))
    axios.put(endPoint, {
      id: id,
      name: data.name,
      time: data.time,
      text: data.text     
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const removeData = (id) => {
    setInfo(information.filter(info => info.id !== id))
    axios.delete(endPoint, 
    {
      data: id
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const handleChange = (e) => {
    setKeyword(e.target.value)
  }

  if (loading) return <div>Now Loading...</div>
  if (error) return <div>Error!</div>

  let filteredInfo
  if (information !== null){
    filteredInfo = information.filter(
      info => {
        return info.name.indexOf(keyword) !== -1 || info.text.indexOf(keyword) !== -1
      }
    )
  }

  return (
    <div style={style}>
      <div>
        <TwitForm addData={addData} />
      </div>
      <p>
        <Input 
          placeholder="Search by a Writer or Text" 
          onChange={handleChange}
          value={keyword}
          margin="dense"
          fullWidth="true"
        />
      </p>
      {
        filteredInfo
        ? <TwitInfoList data={filteredInfo} removeData={removeData} updateData={updateData}/>
        : <p></p>
      }
      
    </div>
  )
}

export default App;

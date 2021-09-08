import { useState } from 'react';
import './App.css';
import TwitForm from './components/TwitForm'
import TwitInfoList from './components/TwitInfoList';

function App() {
  let id = 2
  const [information, setInfo] = useState([
    {
      id: 0,
      name: 'Mike',
      time: 123,
      text: '1st text eg'
    },
    {
      id: 1,
      name: 'Ben',
      time: 345,
      text: '2nd text eg'
    }
  ])
  const [keyword, setKeyword] = useState('')

  const addData = (data) => {
    setInfo(information.concat({ id: id++, ...data }))
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
  const filteredInfo = information.filter(
    info => info.name.indexOf(keyword) !== -1
  );
  return (
    <div>
      <div>
        <TwitForm addData={addData} />
      </div>
      <p>
        <input 
          placeholder="Search.." 
          onChange={handleChange}
          value={keyword}
        />
      </p>
      <TwitInfoList data={filteredInfo} removeData={removeData} updateData={updateData} />
    </div>
  );
}

export default App;

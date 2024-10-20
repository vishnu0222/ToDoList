import {useState} from 'react';
import './App.css';

function App() {
  const [inputValue, setinputValue] = useState("")
  const [items, setitems] = useState([])
  const [alert, setalert] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [editInputValue, seteditInputValue] = useState("")
  const [editingIndex, seteditingIndex] = useState(null)

  const addItem=()=> {
    if(inputValue==='') {
      displayAlert('Enter something in the textfield to add')
    }
    else if(inputValue.trim()!=="") {
      setitems([...items,inputValue])
      displayAlert(`An item "${inputValue}" is added`)
      setinputValue("")
    }
  }
  const selectItem= (index)=>{
    setSelectedIndex(index)
  }
  const removeItem = ()=> {
    if(selectedIndex!==null) {
      const updatedItems = items.filter((item,i) =>i!==selectedIndex );
      displayAlert(`An item "${items[selectedIndex]}" is Removed`)
      setitems(updatedItems)
      setSelectedIndex(null)
    }
    else{
      displayAlert('Select an item to remove')
    }
  }
  const editItem = (index) => {
    seteditingIndex(index);
    seteditInputValue(items[index]);
  }
  const saveItem = () =>{
    const updatedItems=[...items];
    updatedItems[editingIndex] = editInputValue;
    setitems(updatedItems)
    seteditingIndex(null)
    setalert("An item has been edited")
  }

  const handleOnChange= (event) => {
    setinputValue(event.target.value)
  }
  const displayAlert=(message)=>{
    setalert(message)
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  
  return (
    <div className='container' > 
      <div style={{height : '50px'}}> 
      {alert && 
      <div className="alert alert-warning" id='alert' role="alert">
        {alert}
      </div>
      }
      </div>

      <h1>To Do List</h1>
      <div className="container">
        <div className="List">
          <textarea value={inputValue}onChange={handleOnChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          <br />
          <button type="button"  onClick={addItem} className="btn">Add</button>
          <button type="button" onClick={removeItem} className="btn">Remove</button>
        <ul className='list'>
          {
            items.map((item,index)=> (
            <div className='list_display_container'>
              {editingIndex===index ? (
                <>
                <input type="text" value={editInputValue} onChange={(event) =>{seteditInputValue(event.target.value)}} />
                <button onClick={saveItem}>Save</button>
                </>) :(
                  <>
              <li onClick={()=>selectItem(index)} className={selectedIndex===index ? 'selected' : ''}>{item}</li>
              <i id="EditIcon"style={{paddingLeft:"20px"}} onClick= {()=>{editItem(index)}} className="bi bi-pen"></i>
                  </>
                )
            }
            </div>
              
            )
          )}
        </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

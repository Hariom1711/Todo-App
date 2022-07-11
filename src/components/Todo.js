import React, { useEffect, useState } from 'react'
import "./style.css"

// getiing data from Localstorage back

const getLocalStorageData= ()=>{
    const lists =localStorage.getItem ("mytodolist")

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return []
    }
}


const Todo = () => {

    const [inputData,setInputData]=useState("")
    const [items,setItems]=useState(getLocalStorageData);
    const [isEditItem,setIsEditItem]=useState();
    const [toggleButton,setToggleButton]=useState(false)

const addItem =()=>{

    if(!inputData){
        alert ("plz fil the data")
    }

    else if(inputData && toggleButton){
        setItems(
            items.map((curElem)=>{
                if(curElem.id ===isEditItem){
                    return {... curElem ,name:inputData}
                }
                return curElem
            })
        )
        setInputData([])
        setIsEditItem(null)
        setToggleButton(false);
    }
    else{
const myNewInputData={
    id:new Date().getTime().toString(),
    name:inputData,
};

        setItems([...items,myNewInputData])
        setInputData("")
    }
}
// upadate item 
const editItem=(index)=>{
    const todo_item_edited=items.find((curElem)=>{
return curElem.id ===index;
    })
    setInputData(todo_item_edited.name)
    setIsEditItem(index)
    setToggleButton(true);
}



// deleteItem 

const deleteItem= (index)=>{
const updatedItem=items.filter((curElem)=>{
    return curElem.id !==index;
})
setItems(updatedItem)
}




const removeAll =()=>{
    setItems([])
}


// adding localStorage 


useEffect(()=>{

    localStorage.setItem("mytodolist", JSON.stringify(items))
},[items])
  return (

    <>
    
    <div className='main-div'>


<div className='child-div'>


    <figure  classname="bg-img">

   <img src="https://cdn.icon-icons.com/icons2/1918/PNG/512/iconfinder-document03-1622833_121957.png" alt="" />
      
        <figcaption>Add Your List Here ✌ </figcaption>
    </figure>
    <div className='addItems'>
        <input type="text" placeholder='✍ Add Item' className='form-control' value={inputData} onChange={(event)=> (
            setInputData(event.target.value)
        )}/>
        {toggleButton ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>
        ):(    <i className="fa fa-circle-plus" onClick={addItem}></i>) }
    
    </div>

{/* show items  */}

<div className='showItems'>
{items.map((curElem)=>{
return(
  
   <div className='eachItem' key={curElem.id}>
        <h3>{curElem.name}</h3>
        <div className='todo-btn'>
        <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
        <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
        </div>
    </div>
)
})}
    
</div>

{/* remove all item  */}

    <div className='showItems'>
        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CheckList</span> </button>
    </div>
</div>

    </div>
    
    
    </>
  )
}

export default Todo

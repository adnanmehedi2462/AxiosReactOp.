import logo from './logo.svg';
import './App.css';
import Axios from "axios";
import React, {useState, useEffect} from 'react'
function App() {
    const [todo, setTodo] = useState(null)
    const [addtodo, setAddtodo] = useState({title: '', discriptions: ''})
    const [loading, setLoading] = useState(true)
    const [editid,setEditid]=useState(null)
    const [edit,setEdit]=useState(false)
    

    const {title, discriptions,id} = addtodo;

const hendelChange=(e)=>{
  setAddtodo({
    ...addtodo,
    [e.target.name]:e.target.value
  })

}



const getTodo = async () => {
  await Axios({method: "GET", url: "http://localhost:8000/"}).then(
      (response) => {

          setTodo(response.data)

          setLoading(false)

      }
  )

};


    useEffect(() => {
   
        getTodo();

    }, [])



    const Hendelsubmit=async()=>{
   
      await Axios({
        method:"post",
        url:"http://localhost:8000/",
        data:{
          'title':title,
          'discriptions':discriptions,
         
        }
        
    
    
      }).then((response)=>{
        
        console.log(response.data)
        setAddtodo(response.data)
       
        getTodo();
        
        
        
    
      })
      // clear input 
      setAddtodo({title:'',
      discriptions:''});
      
    
    }

const hendelSubmit=(e)=>{
  e.preventDefault();

 
}



const deleteData=async(id)=>{
  await Axios({
    method:"delete",
    url:`http://localhost:8000/${id}/`
  }).then(response=>{
    setTodo(response.data)
    getTodo();

  })
}

const editData=async(id)=>{
  setEditid(id)
  await Axios({
    method:"get",
    url:`http://localhost:8000/${id}/`
  }).then(response=>{
    // setAddtodo(response.data,...addtodo['title'])
 
    setAddtodo(response.data)

    
  
    setEdit(true)
  })


}

const HendelEdit=async()=>{
  await Axios({
    method:'put',
    url:`http://localhost:8000/${editid}/`,
    data:{
      'title':title,
      'discriptions':discriptions,
     
    }
  }).then(response=>{
    setAddtodo(response.data);
    getTodo();
    setAddtodo({title:'',
    discriptions:''});
    setEdit(false)

  })
}


    return (
    <>
     <h1> 
      {loading && <h1>Loading......</h1>}
     
        </h1>

        <form onSubmit={hendelSubmit} >
        <input
        type="text"
        name='title'
        value={title}
        placeholder='Todo Title'
        onChange={hendelChange}></input>
    <input
        type="text"
        name='discriptions'
        value={discriptions}
        placeholder='Todo Discriptions'
        onChange={hendelChange}></input>
    {edit?(<button type='submit' onClick={HendelEdit}>Update Todo</button>): (<button type='submit' onClick={Hendelsubmit}>Add Todo</button>)}


</form>


        {
        todo && todo.map((all, pk) => (

            <div
                key={pk}
                style={{
                    'width' : "30rem",
                    'background' : 'gray',
                    'padding' : '20px',
                    'margin' : '20px',
                    'color' : '#fff'
                }}>
<p>{all.id}</p>
                <h1>{all.title}</h1>
                <h3>{all.discriptions}</h3>
                <address>{all.created_at}</address>
                <button type='submit' onClick={()=>deleteData(all.id)} >Delete</button>
                <button type='submit' onClick={()=>editData(all.id)} >Edit</button>

            </div>

        ))
    } 
    
    </>
       
  )
 
}

export default App;
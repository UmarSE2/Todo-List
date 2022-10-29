import React ,{useState} from 'react'
import moment from 'moment'

export default function Todo() {
    const [name, setName] = useState()
    const [data, setData] = useState([])
    const [toggle, setToggle] = useState(true)
    const [isEditItem, setIsEditItem] = useState(null);
    const [time, setTime] = useState()

    setInterval(() => {
      setTime(new moment().format('MM/DD/YYYY, h:mm:ss A'))
    }, 1000);
    
    const handleAdd = () => {
        if (!name) {
        } 
        
        else if (name && !toggle) {
          setData(
            data.map((elem) => {
              if (elem.id === isEditItem) {
                return { ...elem, name: name}
              }
              return elem;
            })
          )
          setToggle(true);
          setName('');
          setIsEditItem(null);
        } 

        else {
          const allInputData = { id: new Date().getTime().toString(), name: name, Counter: 0}
          setData([...data, allInputData]);
          setName('')
        }
      }

    const handleEdit = (id) => {
      let newEditItem = data.find((elem) => {
        return elem.id === id
      });
      setToggle(false);
      setName(newEditItem.name);
      setIsEditItem(id);
    }

    const handleDelete = (index) =>{
      var newData = data.filter((elem, i) => {
          if(index !== i) {
              return elem
          }
      })
      setData(newData)
    };

    const handleIncrement = (e) => {
      setData(
        data.map((elem, index) => {
          if (index === e) {
            var inc = elem.Counter +1
            return { ...elem, Counter: inc}
          }
          return elem;
        })
      )      
    }
   
    const handleDecrement = (e) => {
      setData(
        data.map((elem, index) => {
          if (index === e) {
            var dec = elem.Counter -1
            return { ...elem, Counter: dec}
          }
          return elem;
        })
      ) 
    }

    const handleReset = () => {
      setData(
        data.map((elem) => {
          var res = elem.Counter = 0
          return {...elem, Counter: res};
        })
      )
    };

return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <p class="navbar-brand">Enter Task</p>

            <input class="form-control col-2" type="text" value={name} placeholder={"Task Name"} 
              onChange= {(e) => {setName(e.target.value)}}></input>

            {toggle
              ? <button className='btn btn-primary btn-md mr-5' onClick = {handleAdd}> Add Task </button>
              : <button className='btn btn-info btn-md mr-5' onClick = {handleAdd}> Save </button>
            }

            <button className='btn btn-danger btn-md ms-5' onClick = {handleReset}>Reset Number of Persons</button>
            <span className='badge-danger btn-lg font-weight-bold'> {time} </span>
          </div>
        </nav>

        <div>
            {data.map( (elem, index) => (
                <p key={index}>
                    <div>
                        <button className='btn btn-secondary btn-sm' onClick = {()=>handleIncrement(index)}> + </button>
                        <button className='btn btn-secondary btn-sm' onClick = {() => { handleDecrement(index) }}> - </button>                        
                        
                        <span style={ {fontSize: 15} } className='m-2' >
                            <> {elem.Counter === 0
                                ? <span className='badge-pill badge-warning font-weight-bold'>Persons Zero</span>
                                : <span className='badge-pill badge-primary font-weight-bold'>{'Persons'} {elem.Counter}</span>}
                            </>
                        </span>
                        
                        {elem.name}

                        <button className='btn btn-info btn-sm m-2' onClick = {() => handleEdit(elem.id)}> edit </button>      
                        <button className='btn btn-danger btn-sm m-2' onClick = {() => handleDelete(index)}> Delete </button>
                    </div>
                </p>
            ))}
        </div>
    </div>
  )
}

import React, { useState } from 'react'
import moment from 'moment'

export default function Todo() {
  const [name, setName] = useState()
  const [data, setData] = useState([])
  const [time, setTime] = useState()
  const [toggleEdit, settoggleEdit] = useState([])
  const [isEditItem, setIsEditItem] = useState(null);
  const [updateData, setUpdateData] = useState()
  setInterval(() => {
    setTime(new moment().format('MM/DD/YYYY, h:mm:ss A'))
  }, 1000);
  // console.log("The Json format is", data)
  const handleAdd = () => {
    if (!name) {
    }

    // else if (name) {
    //   setData(
    //     data.map((elem) => {
    //       if (elem.id === isEditItem) {
    //         return { ...elem, name: name }
    //       }
    //       return elem;
    //     })
    //   )
    //   setName('');
    //   setIsEditItem(null);
    // }

    else {
      const allInputData = { id: new Date().getTime().toString(), name: name, Counter: 0 }
      setData([...data, allInputData]);
      settoggleEdit([...toggleEdit, false])
      setName('')
    }
  }

  const handleEdit = (id) => {
    var arr = toggleEdit.map((ls, index) => {
      if (id === index) {
        return true
      }
      else {
        return ls
      }
    })
    settoggleEdit(arr);
    setUpdateData(data[id].name)
  }

  const handleInputBox = (id) => {
    console.log("The Data is", updateData)

    const newState = data.map((obj, index) => {

      if (id === index) {
        return { ...obj, name: updateData };
      }


      return obj;
    });
    setData(newState)
    // setIsEditItem(null);

    var arr = toggleEdit.map((ls, index) => {
      if (id === index) {
        return false
      }
      else {
        return ls
      }
    })
    console.log("The Data is", data[id].name)
    settoggleEdit(arr)
  }

  const handleSecondInput = (param1, param2) => {
    console.log("The clg is", param1, param2.target.value)
    setUpdateData(param2.target.value)
  }

  const handleDelete = (index) => {
    var newData = data.filter((elem, i) => {
      if (index !== i) {
        return elem
      }
    })
    setData(newData)
  };

  const handleIncrement = (e) => {
    setData(
      data.map((elem, index) => {
        if (index === e) {
          var inc = elem.Counter + 1
          return { ...elem, Counter: inc }
        }
        return elem;
      })
    )
  }

  const handleDecrement = (e) => {
    setData(
      data.map((elem, index) => {
        if (index === e) {
          var dec = elem.Counter - 1
          return { ...elem, Counter: dec }
        }
        return elem;
      })
    )
  }

  const handleReset = () => {
    setData(
      data.map((elem) => {
        var res = elem.Counter = 0
        return { ...elem, Counter: res };
      })
    )
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <p className="navbar-brand">Enter Task</p>
          <input className="form-control col-2" type="text" value={name} placeholder={"Task Name"}
            onChange={(e) => { setName(e.target.value) }}></input>
          <button className='btn btn-primary btn-md mr-5' onClick={handleAdd}> Add Task </button>
          <button className='btn btn-danger btn-md ms-5' onClick={handleReset}>Reset Number of Persons</button>
          <span className='badge-danger btn-lg font-weight-bold'> {time} </span>
        </div>
      </nav>

      <div>
        {data.map((elem, index) => (
          <span key={index}>
            <div>
              <button className='btn btn-secondary btn-sm' onClick={() => handleIncrement(index)}> + </button>
              <button className='btn btn-secondary btn-sm' onClick={() => { handleDecrement(index) }}> - </button>

              <span style={{ fontSize: 15 }} className='m-2'>
                {elem.Counter === 0
                  ? <span className='badge-warning col-8 rounded font-weight-bold'>Persons Zero</span>
                  : <span className='badge-primary col-8 rounded font-weight-bold'>{'Persons'} {elem.Counter}</span>}
              </span>

              {toggleEdit[index]
                ? null
                : elem.name
              }

              {toggleEdit[index]
                ? <input className='col-4' type="text" value={updateData} onChange={(e) => handleSecondInput(index, e)} />
                : null
              }
              {!toggleEdit[index]
                ? <button className='btn btn-info btn-sm m-2' onClick={() => handleEdit(index)}> edit </button>
                : <button className='btn btn-info btn-sm m-2' onClick={() => handleInputBox(index)}> save </button>
              }
              <button className='btn btn-danger btn-sm m-2' onClick={() => handleDelete(index)}> Delete </button>
            </div>
          </span>
        ))}
      </div>
    </div >
  )
}

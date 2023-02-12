const PersonForm = function({newPerson, handleChangeName, handleChangeNumber, addName}){
  return(
    <form >
        <div>
          name: <input value={newPerson.name} onChange={handleChangeName}/>
        </div>
        <div>
          number: <input value={newPerson.number} onChange={handleChangeNumber} type="text" />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
  )
}

export default PersonForm;
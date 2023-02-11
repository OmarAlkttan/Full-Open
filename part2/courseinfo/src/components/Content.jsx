const Content = ({parts}) => {
  console.log('parts', parts);
  const Part = ({part}) => {
    return(
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }


  return (
    <>
      {parts.map(part=>{
          return <Part key={part.id} part={part} />
        })}
    </>
    
  )
}

export default Content;
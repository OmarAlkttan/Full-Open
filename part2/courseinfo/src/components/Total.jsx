const Total = ({parts}) => {
  console.log('total parts', parts);
  return(
    <p>total of ${parts.reduce((total, part)=>{ return total + part.exercises}, 0)} exercises </p>
  )
}

export default Total;
import Course from './Course';

const Courses = function({courses}){
  console.log('courses', courses)
    return(
      <div>
        <h1>Web development curriculum</h1>
        {courses.map((course=>{
          return <Course key={course.id} course={course} />
        }))}
      </div>
    )
}

export default Courses;
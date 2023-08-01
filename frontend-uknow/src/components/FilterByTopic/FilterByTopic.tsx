import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import { AllCoursesCard } from '../AllCourses/AllCoursesCard'

export const FilterByTopic = () => {
  const [searchParam] = useSearchParams()
  const filter = searchParam.get('filter')
  const [filteredTopic, setFilteredTopic] = useState<any[]>([])

  useEffect(() => {
    const getFilteredCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/courses/topic?filter=${filter}`)
        const courses = res.data
        setFilteredTopic(courses)
      } catch (error) {
        console.log(error)
      }
    }

    getFilteredCategories()
  }, [])

  return (
    <Container>
      <div className='d-flex' style={{ gap: 15 }}>
        <div className='d-flex align-items-center'>
          <a href='/home'>
            <i className='bi bi-arrow-return-left' />
          </a>
        </div>
        <h4>Courses filtered by: {filter}</h4>
      </div>

      <div className='d-flex flex-wrap justify-content-center mt-4' style={{ display: 'inline-block', gap: 10 }}>
        {filteredTopic.map((course, i) => (
          <div key={i}>
            <Link to={`/course/${course._id}`}>
              <AllCoursesCard image={course.image} rating={course.rating} title={course.name} price={course.price} />
            </Link>
          </div>
        ))}
      </div>
    </Container>
  )
}

import { Container } from 'react-bootstrap'
import { AllCoursesCard } from '../AllCourses/AllCoursesCard'
import styles from './CreatedCourses.module.css'
import { useEffect, useState } from 'react'

export const CreatedCourses = () => {
  const [course, setCourse] = useState<any[]>([])
  const userId = localStorage.getItem('id')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/courses/created-courses/${userId}`)
        const data = await response.json()
        setCourse(data.data)
      } catch (error) {
        console.log('No se encuentra ese curso por su:', error)
      }
    }
    fetchCourse()
  }, [])

  return (
    <Container className={styles.container}>
      <h6>Created Courses</h6>
      <div className='d-flex flex-wrap justify-content-center' style={{ display: 'inline-block', gap: 10 }}>
        {course.length > 0
          ? (
            <div className='d-flex flex-wrap justify-content-center' style={{ display: 'inline-block', gap: 10 }}>
              {course.map((course, i) => (
                <div key={i}>
                  <AllCoursesCard image={course.image} rating={course.rating} title={course.title} price={course.price} />
                </div>
              ))}
            </div>
            )
          : (
            <p>No created courses available.</p>
            )}
      </div>
    </Container>
  )
}

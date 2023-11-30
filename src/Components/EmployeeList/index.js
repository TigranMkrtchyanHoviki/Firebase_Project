import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom"
import { db } from "../../firebase-config"
import { useEffect, useState } from "react"
import { toBeEnabled } from "@testing-library/jest-dom/matchers"

const EmployeeList = () => {

    const navigation = useNavigate()

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const handlerShowEmployeeList = async () => {
        const employees = await collection(db, "employees")
         const list = await getDocs(employees)
         setData(list.docs.map(elm => {
            return {
                ...elm.data(), 
                id: elm.id
            }
         }))
         setLoading(false)
    }

    const handlerDelete = async (id) => {
         setLoading(true)
         const item = await doc(db, "employees", id)
         await deleteDoc(item)
         setData(data.filter(employee => employee.id !== id))
         setLoading(false)
    }

    const handlerGoToEditPage = (id) => {
        navigation(`/edit/${id}`)
    }

    useEffect(() => {
        handlerShowEmployeeList()
    }, [])

    return (
        <div>
            <h1>list of Employee</h1>
            <Link to={"/add"}>Add an employee</Link>

            {
                loading?
                <div>loading</div>
                :
                <div>
                    {
                        
                            <table>
                                <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>surname</th>
                                        <th>position</th>
                                        <th>salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       data.map(employee => {
                                           return <tr key={employee.id}>
                                                      <td>{employee.name}</td>
                                                      <td>{employee.surname}</td>
                                                      <td>{employee.position}</td>
                                                      <td>{employee.salary}</td>
                                                      <td>
                                                          <button onClick={() => handlerDelete(employee.id)}>Delete</button>
                                                          <button onClick={() => handlerGoToEditPage(employee.id)}>Edit</button>
                                                      </td>
                                                  </tr>
                                        })
                                  }
                                </tbody>
                            </table>
                        
                    }
                </div>
            }
        </div>
    )
}

export default EmployeeList
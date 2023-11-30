import { useState } from "react"
import { db } from "../../firebase-config"
import { addDoc, collection } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const AddEmployee = () => {

    const navigatin = useNavigate()

    const employeeList = collection(db, "employees")
    const positions = ["Developer", "HR maneger", "SMM spesialist", "Trainert", "Menager", "SEO"]
    const [user, setUser] = useState({ name: "", surname: "", salary: "", position: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()

        await addDoc(employeeList, user)

        setUser({ name: "", surname: "", salary: "", position: "" })

        navigatin("/")
    }

    return (
        <div>
            <h1>Add Employee</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>name</label>
                    <input type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>

                <div>
                    <label>surname</label>
                    <input type="text"
                        value={user.surname}
                        onChange={(e) => setUser({ ...user, surname: e.target.value })} />
                </div>

                <div>
                    <label>position</label>

                    <select value={user.position}
                        onChange={(e) => setUser({ ...user, position: e.target.value })}>
                        <option>please select</option>

                        {positions.map((item, i) => {
                            return <option key={i}>{item}</option>
                        })}

                    </select>
                </div>

                <div>
                    <label>salary</label>
                    <input type="number"
                        value={user.salary}
                        onChange={(e) => setUser({ ...user, salary: e.target.value })} />
                </div>

                <div>
                    <button>add</button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployee
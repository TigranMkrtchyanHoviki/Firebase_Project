import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase-config"
import { getDoc, doc, updateDoc } from "firebase/firestore"


const EditEmployee = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const [user, setUser] = useState({})
    const positions = ["Developer", "HR maneger", "SMM spesialist", "Trainert", "Menager", "SEO"]

    

    
    const handlerShowEmployee = async () => {
        const item = await doc(db, "employees", id)
        const info = await getDoc(item)
        setUser(info.data())
    }

    const handlerSubmit =  async (e) => {
        e.preventDefault()

        const replaceItem = doc(db, "employees", id)
        await updateDoc(replaceItem, user)
        navigate("/")
    }

    useEffect(() => {
        handlerShowEmployee()
    }, [])

    return (
        <div>
            <h1>Edit Employee</h1>

            <form onSubmit={handlerSubmit}>
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
                    <button>edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditEmployee
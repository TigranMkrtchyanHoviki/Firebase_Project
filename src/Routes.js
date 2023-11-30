import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./Components/addEmployee";
import EmployeeList  from "./Components/EmployeeList";
import EditEmployee from "./Components/EditEmployee";

export const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<EmployeeList />} />
                <Route path={"/add"} element={<AddEmployee />} />
                <Route path={"/edit/:id"} element={<EditEmployee />} />
                <Route path={"*"} element={<h1>Not found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}
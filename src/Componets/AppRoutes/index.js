import Users from "../../Pages/Users";
import Dashboard from "../../Pages/Dashboard";
import Product from "../../Pages/Products";
import Orders from "../../Pages/Orders";
import Reports from "../../Pages/Reports";
import {Route,Routes} from "react-router-dom";

function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/product" element={<Product/>}></Route>
            <Route path="/orders" element={<Orders/>}></Route>
            <Route path="/users" element={<Users/>}></Route>
            <Route path="/reports" element={<Reports/>}></Route>
        </Routes>
    );
}
export default AppRoutes;
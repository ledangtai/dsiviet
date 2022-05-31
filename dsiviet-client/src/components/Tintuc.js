import { react } from "react";
import Admin from "./Admin";
import '../css/nhanvien.css'
import TintucForm from "./TintucForm";

function Tintuc(){
    return( 
    <div className="nhanvien">
            <Admin />
            <TintucForm />
    </div>
    )}
export default Tintuc;
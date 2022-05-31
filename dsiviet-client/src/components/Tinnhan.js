import { react } from "react";
import Admin from "./Admin";
import '../css/nhanvien.css'
import TinnhanForm from "./TinnhanForm";

function Tinnhan(){
    return( 
    <div className="nhanvien">
            <Admin />
            <TinnhanForm />
    </div>
    )}
export default Tinnhan;
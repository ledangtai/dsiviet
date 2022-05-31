import { react } from "react";
import Admin from "./Admin";
import Nhanvienform from "./Nhanvienform";
import '../css/nhanvien.css'

function Nhanvien(){
    return( 
    <div className="nhanvien">
            <Admin />
            <Nhanvienform />
    </div>
    )}
export default Nhanvien
import { react } from "react";
import Admin from "./Admin";

import '../css/nhanvien.css'
import KhachhangForm from "./KhachhangForm";
import DiachiForm from "./Diachiform";

function Diachi(){
    return( 
    <div className="nhanvien">
            <Admin />
            <DiachiForm />
    </div>
    )}
export default Diachi
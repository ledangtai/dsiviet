import { react } from "react";
import Admin from "./Admin";

import '../css/nhanvien.css'
import KhachhangForm from "./KhachhangForm";

function Khachhang(){
    return( 
    <div className="nhanvien">
            <Admin />
            <KhachhangForm />
    </div>
    )}
export default Khachhang
import { react } from "react";
import Admin from "./Admin";

import '../css/nhanvien.css'
import GioithieuForm from "./GioithieuForm";

function Gioithieu(){
    return( 
    <div className="nhanvien">
            <Admin />
            <GioithieuForm />
    </div>
    )}
export default Gioithieu
import { react } from "react";
import Admin from "./Admin";

import '../css/nhanvien.css'
import SangiaodichForm from "./SangiaodichForm";

function Sangiaodich(){
    return( 
    <div className="nhanvien">
            <Admin />
            <SangiaodichForm />
    </div>
    )}
export default Sangiaodich
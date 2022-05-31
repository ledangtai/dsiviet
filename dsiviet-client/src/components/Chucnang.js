import { react } from "react";
import Admin from "./Admin";

import '../css/nhanvien.css'
import ChucnangForm from "./ChucnangForm";

function Chucnang(){
    return( 
    <div className="nhanvien">
            <Admin />
            <ChucnangForm />
    </div>
    )}
export default Chucnang
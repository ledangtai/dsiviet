import { react } from "react";
import Admin from "./Admin";
import '../css/nhanvien.css'
import Sanphamform from "./Sanphamform";

function Sanpham(){
    return( 
    <div className="nhanvien">
            <Admin />
            <Sanphamform />
    </div>
    )}
export default Sanpham
import { react } from "react";
import Admin from "./Admin";
import '../css/nhanvien.css'
import SliderList from "./SliderList";

function Slider(){
    return( 
    <div className="nhanvien">
            <Admin />
            <SliderList />
    </div>
    )}
export default Slider;
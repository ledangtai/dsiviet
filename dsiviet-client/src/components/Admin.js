import React,{useState,useEffect} from 'react'
import '../css/Admin.css'
import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link,
    useParams,
    useHistory,
    NavLink
  } from "react-router-dom";

function Admin(){
    let myStore = window.localStorage
    let history = useHistory();
    const [user,setUser] = useState(null);
    
    
    let {adminPage} = useParams();
    const [slide,setSlide] = useState(true)
    let Page = '';
    return(
            
            <div className='body-admin shadow-lg p-3 mb-5 bg-white rounded '>
                
                        <NavLink  to="/admin/nhanvien"><p><span className="ml-2"><i class="fa fa-users"></i> Danh Sách Nhân Viên</span></p></NavLink >
                        <NavLink to="/admin/sanpham"><p><span className="ml-2" ><i class="fa fa-hotel"></i> Dịch Vụ & Sản Phẩm</span></p></NavLink>
                         <NavLink  to="/admin/khachhang"><p><span className="ml-2"><i class="fa fa-user"></i> Danh Sách Khách Hàng</span></p></NavLink >
                        <NavLink to="/admin/slider"><p><span className="ml-2" ><i class="fa fa-slideshare"></i> Danh Sách Slider</span></p></NavLink>
                        <NavLink  to="/admin/diachi"><p><span className="ml-2"><i class="fa fa-map-marker"></i> Danh Sách Địa Chỉ</span></p></NavLink >
                        <NavLink to="/admin/cnhd"><p><span className="ml-2"><i class="fa fa-briefcase"></i> Chức Năng Hoạt Động</span></p></NavLink>
                         <NavLink  to="/admin/sgd"><p><span className="ml-2"><i class="fa fa-stack-exchange"></i> Sàn Giao Dịch</span></p></NavLink >
                        <NavLink  to="/admin/ttsk"><p><span className="ml-2"><i class="fa fa-file"></i> Tin Tức Sự Kiện</span></p></NavLink >
                        <NavLink  to="/admin/tinnhan"><p><span className="ml-2"><i class="fa fa-comments"></i> Tin Nhắn</span></p></NavLink > 
                        <NavLink  to="/admin/gioithieu"><p><span className="ml-2"><i class="fa fa-book"></i> Giới Thiệu</span></p></NavLink >       
        </div>       
    )
    
    
}

export default Admin
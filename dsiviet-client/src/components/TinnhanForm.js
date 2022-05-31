import react, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/nhanvienform.css'
function TinnhanForm(){
    const[tinnhan,settinnhan] = useState([]);
    useEffect(() =>{
          axios.get(process.env.REACT_APP_API_KEY + "Listtinnhan")
          .then(response => settinnhan(response.data))
          .catch(console.error())
         
    },[])
    return(
        <div className ="nhanvienform shadow-lg p-3 mb-5 bg-white rounded ">
            <button type="button" className="btn btn-outline-danger"><i className="fa fa-user-plus"></i> Thêm</button>
        <table className="table table-bordered text-algin-center ">
            <thead>
                <tr>
                    <th scope="col">Họ Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số Điện Thoại</th>
                    <th scope="col">Công Ty</th>
                    <th scope="col">Địa Chỉ</th>
                    <th scope="col">Tiêu Đề</th>
                    <th scope="col">Nội Dung</th>
                </tr>
            </thead>
            <tbody>
                {tinnhan.map(cn =>{
                    return(
                    <tr >
                        <th scope="row">{cn.hoten}</th>
                        <td>{cn.mail}</td>
                        <td >{cn.sdt}</td>
                        <td>{cn.congty}</td>
                        <td>{cn.diachi}</td>
                        <td>{cn.tieude}</td>
                        <td>{cn.noidung}</td>
                    </tr>
                )})}
            </tbody>
        </table>
        </div>
    )
}
export default TinnhanForm;
import react, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/nhanvienform.css'
function GioithieuForm(){
    const[gioithieu,setgioithieu] = useState([]);
    useEffect(() =>{
          axios.get(process.env.REACT_APP_API_KEY + "Listgioithieu")
          .then(response => setgioithieu(response.data))
          .catch(console.error())
         
    },[])
    return(
        <div className ="nhanvienform shadow-lg p-3 mb-5 bg-white rounded ">
            <button type="button" className="btn btn-outline-danger"><i className="fa fa-user-plus"></i> Thêm</button>
        <table className="table table-bordered text-algin-center ">
            <thead>
                <tr>
                    <th scope="col">Mã Giới Thiệu</th>
                    <th scope="col">Tiêu Đề</th>
                    <th scope="col">Nội Dung</th>
                    <th scope="col">Hình Ảnh </th>
                    <th>Tác Vụ</th>
                </tr>
            </thead>
            <tbody>
                {gioithieu.map(dc =>{
                    return(
                    <tr key = {dc.magt}>
                        <th scope="row">{dc.magt}</th>
                        <td>{dc.tieude}</td>
                        <td style={{width:'500px'}}>{dc.noidung}</td>
                        <td><img style={{width:'300px', height:'100px'}} src = {dc.hinhanh} /></td>

                        <td style={{textAlign:'center'}}><span><i className="fa fa-trash" style={{marginRight:'10%'}}></i></span><span><i className="fa fa-edit" style={{marginRight:'10%'}}></i></span></td>
                    </tr>
                )})}
            </tbody>
        </table>
        </div>
    )
}
export default GioithieuForm;
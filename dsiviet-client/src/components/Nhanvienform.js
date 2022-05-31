import react, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/nhanvienform.css'
import dateFormat from 'dateformat';
import { useForm } from "react-hook-form";
import Moment from 'moment';
function Nhanvienform(){
    const[nhanvien,setnhanvien] = useState([]);
    const [on,setOn] = useState(false)
    const [onUpdate,setOnUpdate] = useState(false)
    const { register, handleSubmit, setValue } = useForm();
    useEffect(() =>{
          axios.get(process.env.REACT_APP_API_KEY + "ListNv")
          .then(response => {setnhanvien(response.data); console.log(nhanvien)})
          .catch(console.error())
         
    },[])
    const checkNhanvien = (manv)=>{
        for(let i=0;i<nhanvien.length;i++){
            if(nhanvien[i].manv === manv)
            return true;
        }
        return false;
    }
    
    const onSubmit = async data => {
        const myData = {
            ...data,
        }
        const myAlterData = {
            manv:myData.manv,
            hoten:myData.hoten,
            ngaysinh:myData.ngaysinh,
            chucvu:myData.chucvu
        }
        if(onUpdate){
            console.log("update")
            await axios.put(process.env.REACT_APP_API_KEY +'updateNV',myAlterData)
            .then(response =>{
                setOn(!on)
                setOnUpdate(!onUpdate)
                axios.get(process.env.REACT_APP_API_KEY+'ListNv')
                .then(response => setnhanvien(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
        else{
            if(checkNhanvien(myData.manv)===true){
                alert('Trùng mã nhân viên !!!')
                console.log('abc')
                return;
            }
             await axios.post(process.env.REACT_APP_API_KEY +'insertNV',myAlterData)
            .then(response =>{
                console.log(response)
                console.log(myData.manv)
                setOn(!on)
                axios.get(process.env.REACT_APP_API_KEY+'ListNV')
                .then(response => setnhanvien(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
    }

    const getInsertNV = ()=>{
        setOn(true); 
        setValue("manv",'')
        setValue("hoten",'')
        setValue("ngaysinh",'')
        setValue("chucvu",'')
    }
    const getUpdateNV = (nv)=>{
        setOn(true); 
        setOnUpdate(true)
        setValue("manv",nv.manv)
        setValue("hoten",nv.hoten)
        setValue("ngaysinh",Moment(nv.ngaysinh).format('YYYY-MM-DD'))
        setValue("chucvu",nv.chucvu)
    }
    const getDeleteNV = (manv)=>{
        let agree = window.confirm(`Bạn có muốn xóa manv = ${manv}?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API_KEY+'deleteNV?manv='+  manv)
        .then(response => {

            alert('Xóa Thành Công !!!')
            axios.get(process.env.REACT_APP_API_KEY+'ListNV')
            .then(response => setnhanvien(response.data) )
            .catch(erro =>alert('Xóa thất bại !!!'))
        } )
        .catch(erro => alert('Xóa thất bại'))
    }
    return(
        <div className ="nhanvienform shadow-lg p-3 mb-5 bg-white rounded ">
            <div className={!on?"workplace_display":"d-none"}>
           <span onClick ={()=> getInsertNV()}> <button type="button" className="btn btn-outline-danger"><i className="fa fa-user-plus"></i> Thêm</button> </span>
        <table  className="table table-bordered text-algin-center ">
            <thead>
                <tr>
                    <th scope="col">Mã Nhân Viên</th>
                    <th scope="col">Họ Tên</th>
                    <th scope="col">Ngày Sinh</th>
                    <th scope="col">Chức Vụ</th>
                    <th>Tác Vụ</th>
                </tr>
            </thead>
            <tbody>
                {nhanvien.map(nv =>{
                    return(
                    <tr key = {nv.manv}>
                        <th scope="row">{nv.manv}</th>
                        <td>{nv.hoten}</td>
                        <td>{Moment(nv.ngaysinh).format('DD/MM/YYYY')}</td>
                        <td>{nv.chucvu}</td>
                        <td style={{textAlign:'center'}}><span  onClick={()=> getDeleteNV(nv.manv)}><i class="fa fa-trash" style={{marginRight:'10%'}}></i></span><span onClick ={()=>getUpdateNV(nv)}><i className="fa fa-edit" style={{marginRight:'10%'}}></i></span></td>
                    </tr>
                )})}
            </tbody>
        </table>
        </div>
        <div className={on?"workplace_input":"d-none"}>
                <div className="card">
                <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <label>Mã Nhân Viên</label>
                                    <input className="form-control" placeholder="Nhập Mã Nhân Viên" {...register('manv',{ required: true})} name='manv' type="number" readOnly={onUpdate?true:false}  />
                                    <label>Họ Tên</label>
                                    <input className="form-control" placeholder="Nhập Họ Tên Nhân Viên" {...register('hoten',{ required: true})}   name='hoten' />
                                    <label>Ngày Sinh <span style={{fontSize:'12px', fontWeight:'100'}}>(VD:1995-12-30)</span> </label>
                                    <input className="form-control" placeholder="Nhập Ngày Sinh" {...register('ngaysinh',{ required: true})}  name='ngaysinh' />
                                   
                                    <label>Chức Vụ</label>

                                          <input className="form-control" placeholder="Nhập Chức Vụ"  {...register('chucvu',{ required: true})}  name='chucvu'/>
                        
           
                                    <button className="btn btn-warning mt-4 mr-4 btn-input"   type="submit" >Cập Nhật</button>
                        
                                    <button className="btn btn-info mt-4 btn-input"  onClick={()=>setOn(!on)} type="button">Thoát</button>
                                  
                                </div>
                                <div className="col-6">
                                    
                                </div>
                            </div>
                            
                            {/* <CKEditor 
                                ref={register} name='motachitiet'
                            /> */}
                            
                            
                        </div>
                    </form>

                </div>
                </div>
                </div>
        </div>
    )
}
export default Nhanvienform
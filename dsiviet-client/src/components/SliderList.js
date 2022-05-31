import react, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/nhanvienform.css'
import { useForm } from "react-hook-form";
import {store} from '../firebase'
function SliderList(){
    const[slider,setslider] = useState([]);
    const [on,setOn] = useState(false)
    const [fileUrl,setFileUrl] = useState('');
    const [onUpdate,setOnUpdate] = useState(false)
    const { register, handleSubmit, setValue } = useForm();
    const [danhmuc,setDanhMuc] = useState(null);
    
    useEffect(() =>{
          axios.get(process.env.REACT_APP_API_KEY + "ListSlider")
          .then(response => setslider(response.data))
          .catch(console.error())
         
    },[])
    const checkSlder = (maslider)=>{
        for(let i=0;i<slider.length;i++){
            if(slider[i].maslider === maslider)
            return true;
        }
        return false;
    }

    const onSubmit = async data => {
        const myData = {
            ...data,
            hinhanh:fileUrl
        }
        const myAlterData = {
            maslider:myData.maslider,
            hinhanh:myData.hinhanh
        }
        if(onUpdate){
            console.log("update")
            console.log(fileUrl)
             axios.put(process.env.REACT_APP_API_KEY +'updateSlider',myAlterData)
            .then(response =>{
                console.log(myData.tieude)
                setOn(!on)
                setOnUpdate(!onUpdate)
                axios.get(process.env.REACT_APP_API_KEY+'ListSlider')
                .then(response => setslider(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
        else{
            if(checkSlder(myData.maslider)===true){
                alert('Trùng mã sản phẩm !!!')
                console.log('abc')
                return;
            }
             axios.post(process.env.REACT_APP_API_KEY +'insertSlider',myAlterData)
            .then(response =>{
                console.log(response)
                console.log(myData.madv)
                setOn(!on)
                axios.get(process.env.REACT_APP_API_KEY+'ListSlider')
                .then(response => setslider(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
    }
    const handleImage = async (e)=>{
  
        // code here
        var file = e.target.files[0];
       // console.log('dsds')
        const fileNameFirst = file?.name;
        const fileNameFinal = fileNameFirst?.replace(/ /g,'')
        var storageRef =  store.ref().child("tai/"+fileNameFinal)
        
        await storageRef.put(file);
        store.ref().child('tai').child(fileNameFinal).getDownloadURL().then(url=> setFileUrl(url));
}
    const getInsertSlider = ()=>{
        setOn(true); 
        setValue("maslider",'')
        setFileUrl('')
        setValue("hinhanh",null)
    }
    const getUpdateSlider = (sl)=>{
        setOn(true); 
        setOnUpdate(true)
        setValue("maslider",sl.maslider)
        setFileUrl('')
        setValue("hinhanh",sl.hinhanh)
    }
    const getDeleteSlider = (maslider)=>{
        let agree = window.confirm(`Bạn có muốn xóa madv = ${maslider}?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API_KEY+'deleteSlider?maslider='+  maslider)
        .then(response => {
            console.log(maslider)
            alert('Xóa Thành Công !!!')
            axios.get(process.env.REACT_APP_API_KEY+'Listsanpham')
            .then(response => setslider(response.data) )
            .catch(erro =>alert('Xóa thất bại !!!'))
        } )
        .catch(erro => alert('Xóa thất bại'))
    }
    return(
        <div className ="nhanvienform shadow-lg p-3 mb-5 bg-white rounded ">
           <p className={!on?"workplace_display":"d-none"} onClick={()=>getInsertSlider()}><button type="button" className="btn btn-outline-danger"><i className="fa fa-user-plus"></i> Thêm</button></p>
           <div className={!on?"workplace_display":"d-none"}>
        <table className="table table-bordered text-algin-center ">
            <thead>
                <tr>
                    <th scope="col">Mã Slider</th>
                    <th scope ="col"> Hình Ảnh</th>
                    <th>Tác Vụ</th>
                </tr>
            </thead>
            <tbody>
                {slider.map(sl =>{
                    return(
                    <tr key = {sl.maslider}>
                        <th scope="row">{sl.maslider}</th>
                        <td><img style={{width:'100px'}} src = {sl.hinhanh} /></td>
                        <td style={{textAlign:'center'}}><span onClick={()=>getDeleteSlider(sl.maslider)}><i className="fa fa-trash" style={{marginRight:'10%'}}></i></span><span onClick={()=>getUpdateSlider(sl)}><i className="fa fa-edit" style={{marginRight:'10%'}}></i></span></td>
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
                                    <label>Mã Slider</label>
                                    <input className="form-control" placeholder="Nhập Mã Slider" {...register('maslider',{ required: true})} name='maslider' type="number" readOnly={onUpdate?true:false}  />
                                   
                                    <label>Hình ảnh</label>
                                    <div className="form-group">
                                          <input className="form-control-file border" placeholder=""  name='hinhanh' type="file" onChange={handleImage}/>
                                    </div>
           
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
export default SliderList;
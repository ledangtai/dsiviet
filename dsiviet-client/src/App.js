import react from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import Admin from './components/Admin';
import AdminHeader from './components/AdminHeader';
import Chucnang from './components/Chucnang';
import Diachi from './components/Diachi';
import Gioithieu from './components/Gioithieu';
import Khachhang from './components/Khachhang';
import Nhanvien from './components/Nhanvien';
import Sangiaodich from './components/Sangiaodich';
import Sanpham from './components/Sanpham';
import Slider from './components/Slider';
import Tinnhan from './components/Tinnhan';
import Tintuc from './components/Tintuc';
function App() {
  return (
    <div className="App">
       <Router >
    
         <Route path ="/admin/nhanvien">
           <AdminHeader />
         <Nhanvien />
         </Route>
         <Route path ="/admin/sanpham">
           <AdminHeader />
          <Sanpham />
         </Route>
         <Route path ="/admin/khachhang">
           <AdminHeader />
          <Khachhang />
         </Route>
         <Route path ="/admin/slider">
           <AdminHeader />
          <Slider />
         </Route>
         <Route path ="/admin/diachi">
           <AdminHeader />
          <Diachi />
         </Route>
         <Route path ="/admin/cnhd">
           <AdminHeader />
          <Chucnang />
         </Route>
         <Route path ="/admin/sgd">
           <AdminHeader />
          <Sangiaodich />
         </Route>
         <Route path ="/admin/ttsk">
           <AdminHeader />
          <Tintuc />
         </Route>
        < Route path ="/admin/gioithieu">
           <AdminHeader />
          <Gioithieu />
         </Route>
         < Route path ="/admin/tinnhan">
           <AdminHeader />
          <Tinnhan />
         </Route>
       </Router>
    </div>
  );
}

export default App;

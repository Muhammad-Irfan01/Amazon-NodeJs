import Loginin from './Component/Authentication/Loginin'
import Signin from './Component/Authentication/Signin'
import Header from './Component/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Component/Home/Home'
import Footer from './Component/Footer/Footer'
import Checkout from './Component/Cart/Checkout'
import DetailPart from './Component/Cart/DetailPart'
import ChangePassword from './Component/Authentication/changePassword'
import ForgotPassword from './Component/Authentication/ForgotPassword'
import ResetPassword from './Component/Authentication/ResetPassword'
function App() {
 
  return (
   <div>
     <Header />

     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/getproductone/:id' element={<DetailPart />}/>
      <Route path='/checkout' element={<Checkout />}/>
      <Route path='/loginin' element={<Loginin />}/>
      <Route path='/signin' element={<Signin />}/>
      <Route path='/changePassword' element={<ChangePassword />}/>
      <Route path='/forgot-password' element={<ForgotPassword />}/>
      <Route path='/reset-password/:token' element={<ResetPassword />}/>
     </Routes>
     
     <Footer />
   </div>
     
   
  )
}

export default App

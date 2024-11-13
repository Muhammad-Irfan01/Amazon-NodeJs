import Loginin from './Component/Authentication/Loginin'
import Signin from './Component/Authentication/Signin'
import Header from './Component/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Component/Home/Home'
import Footer from './Component/Footer/Footer'
import Cart from './Component/Cart/Cart'
import Checkout from './Component/Cart/Checkout'
function App() {
 
  return (
   <div>
     <Header />

     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/checkout' element={<Checkout />}/>
      <Route path='/loginin' element={<Loginin />}/>
      <Route path='/signin' element={<Signin />}/>
     </Routes>
     
     <Footer />
   </div>
     
   
  )
}

export default App

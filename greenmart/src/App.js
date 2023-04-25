import './App.css';
import Header from './components/Header';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import ItemDetail from './components/pages/ItemDetail';
import Profile from './components/pages/Profile';
import MyShop from './components/pages/MyShop';
import CartPage from './components/pages/CartPage';
import PaymentPage from './components/pages/PaymentPage';
import MyOrderDetail from './components/pages/MyOrderDetail';
import Footer from './components/Footer';
import { useSelector } from "react-redux";




// Routing Imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const store = useSelector((store) => store.userinfo);
  console.log(useSelector((store) => store));
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={store.isauth ? <Home /> : <Navigate to="/signin" />} />

          <Route exact path="/profile" element={store.isauth ? <Profile /> : <Navigate to="/signin" />} />

          <Route exact path="/product/:id" element={store.isauth ? <ItemDetail /> : <Navigate to="/signin" />} />

          <Route exact path="/myshop" element={store.isauth ? <MyShop /> : <Navigate to="/signin" />} />

          <Route exact path="/cartpage" element={store.isauth ? <CartPage /> : <Navigate to="/signin" />} />

          <Route exact path="/details" element={store.isauth ? <MyOrderDetail /> : <Navigate to="/signin" />} />

          <Route exact path="/payment/:id" element={store.isauth ? <PaymentPage /> : <Navigate to="/signin" />} />

          {/* before Signin */}
          <Route exact path="/signin" element={!store.isauth ? <SignIn /> : <Navigate to="/" />} />
          <Route exact path="/signup" element={!store.isauth ? <SignUp /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

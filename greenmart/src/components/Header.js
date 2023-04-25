//React imports
import React, { useState, useEffect } from 'react'

//material ui imports
import { Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

//react icons imports
import { FaSignInAlt, FaHome } from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";


//react-router-dom imports
import { Link } from "react-router-dom"

//redux imports 
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux-store/actions/actions";

//firebase imports
import { auth, realDb } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { ref, onValue } from "firebase/database";


function Header() {
    const [ismobile, setismobile] = useState(false);
    const [cartItemsLength, setcartItemsLength] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((store) => store.userinfo);

    useEffect(() => {
        if (user.user) {
            let name = user.user.email.split("@")[0];
            const path = ref(realDb, 'users/' + name + "/Cart/");
            onValue(path, (snapshot) => {
                if (snapshot.val()) {
                    setcartItemsLength(Object.keys(snapshot.val()).length);
                }
                else {
                    setcartItemsLength(null);
                }
            })
        }
    }, [user])

    const usersignOut = () => {
        setismobile(!ismobile)
        dispatch(signout());
        signOut(auth);
    }
    return (
        <div className='navbardiv'>
            <div className="brand">
                <Link onClick={() => { if (ismobile) { setismobile(!ismobile) } }} style={{ textDecoration: 'none' }} to="/">Green Mart</Link>
            </div>
            <div className={ismobile ? "navlinks mobilenavlink" : "navlinks"}>
                {
                    !user.isauth ?
                        <>
                            <ul>
                                <li>
                                    <Button
                                        onClick={() => setismobile(!ismobile)}
                                        component={Link}
                                        to="/signin"
                                        endIcon={<FaSignInAlt />}
                                    >Sign In</Button>
                                </li>
                                <li>
                                    <Button
                                        onClick={() => setismobile(!ismobile)}
                                        component={Link}
                                        to="/signup"
                                        endIcon={<MdAppRegistration />}
                                    >Sign Up </Button>
                                </li>
                            </ul>
                        </> :
                        <>
                            <ul>
                                <li>
                                    <Button
                                        onClick={() => setismobile(!ismobile)}
                                        component={Link}
                                        to="/"
                                        endIcon={<FaHome />}
                                    >Home</Button>
                                </li>
                                <li>
                                    <Button
                                        onClick={() => setismobile(!ismobile)}
                                        component={Link}
                                        to="/profile"
                                        endIcon={<FaSignInAlt />}
                                    >Profile</Button>
                                </li>
                                <li>
                                    <Button
                                        onClick={usersignOut}
                                        component={Link}
                                        to="/signin"
                                        endIcon={<MdAppRegistration />}
                                    >Sign Out </Button>
                                </li>
                                <li
                                    onClick={() => setismobile(!ismobile)}
                                    style={{ fontSize: "1.5em", color: "#4051b5", cursor: "pointer" }}>
                                    <Link as={Link} to="/cartpage" style={{ color: "#000" }}>
                                        <AiOutlineShoppingCart />
                                        {cartItemsLength && <span>{cartItemsLength}</span>}
                                    </Link>
                                </li>
                            </ul>
                        </>
                }
            </div>
            <span className="hamburger" onClick={() => setismobile(!ismobile)}>
                <MenuIcon />
            </span>
        </div>
    )
}

export default Header

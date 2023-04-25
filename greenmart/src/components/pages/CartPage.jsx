import React, { useState, useEffect } from 'react'
import CartItem from './CartItem';


//firebase imports
import { realDb } from "../../firebase/firebaseConfig";
import { ref, onValue, get } from "firebase/database";

//redux imports 
import { useSelector } from "react-redux";

function CartPage() {
    const [cartItemsinfo, setcartItemsinfo] = useState(null);
    const [cartItems, setcartItems] = useState(null);
    const [cartItemsId, setcartItemsId] = useState(null)
    const user = useSelector((store) => store.userinfo);

    useEffect(() => {
        const getdata = async () => {
            let name = user.user.email.split("@")[0];
            const path = ref(realDb, 'users/' + name + "/Cart/");
            onValue(path, async (snapshot) => {
                // setcartItems(null);
                // setcartItemsId(null);
                // setcartItemsinfo(null);
                let temp = [];
                let temp1 = [];
                let temp2 = [];
                for (let x in snapshot.val()) {
                    temp1.push(x);
                    temp2.push(snapshot.val()[x]);
                    let itempath = ref(realDb, "shopItems/" + x);
                    let ans = await get(itempath);
                    temp.push(ans.toJSON());
                }
                setcartItems(temp);
                setcartItemsId(temp1);
                setcartItemsinfo(temp2);
            })
        }
        getdata();
    }, [user.user.email])


    return (
        <div style={{ paddingTop: "100px", minHeight: "80vh" }}>
            {cartItems && cartItemsinfo && cartItemsId && <>
                {cartItems.length === 0 ? <h4>Cart is Empty</h4> : <>
                    {cartItems.map((myitem, id) => {
                        return (
                            <CartItem myitem={myitem} id={cartItemsId[id]} item={cartItemsinfo[id]} />
                        );
                    })}
                </>}
            </>}
        </div>
    )
}

export default CartPage;

import React, { useState, useEffect } from 'react';
import ItemListCard from './ItemListCard';


//react-bootstrap imports 
import { Card, Form, Container } from "react-bootstrap"

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { profileCreated } from "../../redux-store/actions/actions";

//material ui imports 
import { Button, CircularProgress, Grid } from "@material-ui/core";

//firebase imports
import { storage, realDb } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ref as Dref, set, push, onValue, get } from "firebase/database";



function MyShop() {
    const user = useSelector((store) => store.userinfo);
    const dispatch = useDispatch();
    const [isprogress, setisprogress] = useState(false);
    const [shopItems, setshopItems] = useState(null);
    const [shopItemsId, setshopItemsId] = useState(null);
    const [myItemId, setmyItemId] = useState(null);

    //item details 
    const [title, settitle] = useState("");
    const [price, setprice] = useState(0);
    const [desc, setdesc] = useState("");
    const [itemImage, setitemImage] = useState(null);
    const [uplodepercent, setuplodepercent] = useState(0);


    useEffect(() => {
        const getdata = async () => {
            let name = user.user.email.split("@")[0];
            let path = Dref(realDb, 'users/' + name + "/shopItems/")
            onValue(path, async (snapshot) => {
                var temp = [];
                var temp2 = [];
                var temp3 = [];
                for (let x in snapshot.val()) {
                    temp3.push(x);
                    temp2.push(snapshot.val()[x]);
                    let itempath = Dref(realDb, "shopItems/" + snapshot.val()[x]);
                    let ans = await get(itempath);
                    temp.push(ans.toJSON());

                }
                setshopItemsId(temp2);
                setmyItemId(temp3);
                setshopItems(temp);

            });
        }
        getdata();
    }, [user.user.email])

    const addItemInShop = (e) => {
        e.preventDefault();
        setisprogress(true);
        settitle(title.trim());
        setdesc(desc.trim());
        if (!title || !desc || !itemImage) {
            alert("Please fill all fields.");
            return;
        }
        let time = new Date();
        let name = user.user.email.split("@")[0];

        let filename = `${name}_${time.getFullYear()}_${time.getDate()}_${time.getDay()}_${time.getTime()}`;

        const path = ref(storage, `itemImages/${filename}`);
        const uploadTask = uploadBytesResumable(path, itemImage);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setuplodepercent(prog);
        }, (err) => {
            alert(err);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(Url => {
                console.log("this is url", Url);
                let name = user.user.email.split("@")[0];

                const dbref = Dref(realDb, "shopItems/" + filename);

                const data = {
                    Title: title,
                    Price: price,
                    Desc: desc,
                    image: Url,
                    Seller: name
                }
                set(dbref, data);

                const userdbref = Dref(realDb, 'users/' + name + "/shopItems/");
                const pushItem = push(userdbref);
                set(pushItem, filename);

                let path = Dref(realDb, 'users/' + name)
                onValue(path, (snapshot) => {
                    const data = snapshot.val();
                    dispatch(profileCreated(data))
                });
                setisprogress(false);
            });
        })
        settitle("");
        setdesc("");
        setprice(0);
        setitemImage(null);
    }


    return (
        <div style={{ paddingTop: "100px" }}>
            <Card>
                <Card.Header>
                    <h4>Hello {user.user.displayName != null ? user.user.displayName : "User Name"} , welcome to your shop.</h4>
                </Card.Header>

                <Card.Body>
                    <Form onSubmit={addItemInShop}>
                        <Grid container>
                            <Grid item lg={8} md={8} sm={12} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        value={title}
                                        onChange={(e) => {
                                            settitle(e.target.value);
                                        }}
                                        type="text" placeholder="Title" />
                                </Form.Group>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Form.Group className="px-1 mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        value={price}
                                        onChange={(e) => {
                                            setprice(e.target.value);
                                        }}
                                        type="number" placeholder="price" />
                                </Form.Group>
                            </Grid>
                        </Grid>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={desc}
                                onChange={(e) => {
                                    setdesc(e.target.value);
                                }}
                                as="textarea"
                                type="text" placeholder="Description" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Item Image</Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setitemImage(e.target.files[0])
                                }}
                                type="file" />
                        </Form.Group>

                        <Button color="primary" variant="contained" type="submit">
                            Add Item
                        </Button>{isprogress ? <span style={{ margin: "10px", position: "relative", top: "15px" }}><CircularProgress
                            variant="determinate" value={uplodepercent} /></span> : null}
                    </Form>
                </Card.Body>
            </Card>


            <Container>
                <div style={{ paddingTop: "100px" }}>
                    <h3>Shop Items</h3>
                    {shopItems === null || shopItems.length === 0 ? <h5>Shop is empty</h5> :
                        <>
                            {shopItems.map((item, id) => {
                                return (
                                    <ItemListCard key={id} item={item} id={shopItemsId[id]}
                                        myid={myItemId[id]} />
                                );
                            })}
                        </>
                    }
                </div>
            </Container>
        </div>
    )
}

export default MyShop

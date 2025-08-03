import { getBooksOfCart, placeTheOrder } from "../services/customer";
import Swal from "sweetalert2";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    DialogContentText,
    TextField
} from "@mui/material";

import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";

export default function Cart()
{
    const [cartItems, setCartItems] = useState([]);
    const [order, setOrder] = useState([]);

    
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    const fetchBooks = async () => {
        try {
            const res = await getBooksOfCart();
            if (res.status === 200) {
                setCartItems(res.data.cartItem);
                setOrder(res.data);
            }
            console.log(res.data.cartItem);
            
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchBooks();
    }, []);

    const [formData, setformData] = useState({
        orderDescription: "",
        address: "",
    });
    
    const [open, setOpen] = useState(false);

    const handleInputChange = (event) => {
        const {name, value}= event.target;
        setformData(() => ({ ...formData, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await placeTheOrder(formData);
            if (res.status === 200) {
                Swal.fire({
                title: "Yay!  Order Placed Successfully.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
                });
                enqueueSnackbar("Order Placed Successfully", { variant: "success" });
                navigate("/customer/dashboard");
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Failed to place order", { variant: "error" });
        }
    };
    

    return (
        <>
            {cartItems.length === 0 ? (
                    <div className="text-center text-2xl text-gray-600 mt-10">
                        🛒 Your cart is empty.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-20 justify-center relative">
                            {cartItems.map((books) => (
                                <div
                                    key={books.book._id}
                                    className="w-80 flex flex-col transition-all duration-300 ease-in-out rounded-xl bg-white shadow cursor-pointer"
                                    // onClick={() => setExpandedBookId(book._id)}
                                >
                                    <img
                                    src={books.book.imageUrl}
                                    alt="Book"
                                    className="w-full h-60 object-cover rounded-t-lg"
                                    />
                                    <div className="p-6 flex flex-col gap-3">
                                        <h2 className="text-2xl font-semibold">{books.book.title}</h2>
                                        <p className="text-lg text-teal-900">
                                            <strong>Author:</strong> {books.book.author}
                                        </p>
                                        <p className="text-md text-teal-900 font-semibold">{books.book.edition} Edition</p>
                                        <p className="text-md text-yellow-700 font-semibold">Genre: {books.book.genre}</p>
                                        <p className="text-md text-gray-500">Condition: {books.book.condition}</p>
                                        <p className="text-2xl font-bold text-green-600">${books.book.price}</p>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                        <div className="hover:bg-gray-200 hover:border-none fixed bottom-6 right-6 z-50 bg-white border border-green-300 rounded-2xl shadow-lg px-6 py-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            <div className="text-xl sm:text-2xl font-semibold text-yellow-900">
                                Total Price:
                                <span className="ml-2 text-green-900">
                                    ${order.amount}    
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    setOpen(true);
                                }}
                                className="bg-green-600 hover:bg-green-800 hover:cursor-pointer text-white text-base sm:text-lg font-semibold px-6 py-2 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2"
                            >
                                <ShoppingBasket className="w-5 h-5" />
                                Place Order
                            </button>
                        </div>

                        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                            <DialogTitle className="font-bold text-2xl text-green-700">
                                Confirm Your Order
                            </DialogTitle>
                            <DialogContent dividers>
                                <DialogContentText className="mb-4 text-gray-600">
                                    Place your order by adding an address and Order Description.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="address"
                                    name="address"
                                    label="Address"
                                    type="text"
                                    multiline
                                    maxRows={4}
                                    fullWidth
                                    variant="standard"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="Order Description"
                                    name="Order Description"
                                    label="Order Description Or any Instruction"
                                    type="text"
                                    multiline
                                    maxRows={4}
                                    fullWidth
                                    variant="standard"
                                    value={formData.orde}
                                    onChange={handleInputChange}
                                />
                            </DialogContent>

                            <DialogActions>
                                <Button
                                    onClick={() => setOpen(false)}
                                    className="text-gray-600 hover:text-black"
                                >
                                    Cancel
                                </Button>
                                <Button
                                onClick={() => {
                                    handleSubmit
                                    setOpen(false);
                                    Swal.fire({
                                        title: "Order will be place OK to continue.",
                                        icon: "success",
                                        showCancelButton: true,
                                        confirmButtonText: "OK",
                                        cancelButtonText: "Cancel",
                                        confirmButtonColor: "#3085d6",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                           Swal.fire({
                                                title: "Order Placed Successfully",
                                                icon: "success",
                                                confirmButtonText: "OK",
                                                confirmButtonColor: "#3085d6",
                                            })
                                        } else {
                                            Swal.fire({
                                                title: "Order not placed.",
                                                icon: "error",
                                                confirmButtonText: "OK",
                                                confirmButtonColor: "#3085d6",
                                            })              
                                        };
                                    })
                                }}
                                variant="contained"
                                className="bg-green-600 hover:bg-green-800 text-white"
                                >
                                    Confirm Order
                                </Button>
                            </DialogActions>
                            </Dialog>


                    </>
            )}
        </>
    );
}
import { getBooks, searchBook, addBookOtCart } from "../services/customer";
import Swal from "sweetalert2";
import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment"
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingBasket } from "lucide-react";

export default function CustomerDashboard()
{
    const [books, setBooks] = useState([]);
    const [expandedBookId, setExpandedBookId] = useState(null);
    const [selectedGenre, setSelectGenre] = useState('');
    
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    const genres = [
        "Programming", "Fiction", "Classic", "Science Fiction", "Romance", "Fantasy", 
        "Biography", "History", "Mystery", "Self-Help", "Thriller", "Non-Fiction", 
        "Young Adult", "Children's", "Philosophy", "Graphic Novel", "Education", 
        "Horror", "Adventure", "Poetry"
    ];
    
    const fetchBooks = async () => {
        try {
            const res = await getBooks();
            if (res.status === 200) setBooks(res.data.availableBooks);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchBooks();
    }, []);
    
    const handleGenreChange = async (e, value) => {
        setSelectGenre(value);
        console.log(selectedGenre);
        
        if(!value) {
            fetchBooks();
            return;
        }
    
        try {
            const res = await searchBook(value);
            if (res.status === 200) {
                const foundBook =  Array.isArray(res.data)
                                ? res.data
                                : res.data.availableBooks || res.data.books || [];
                if (foundBook.length === 0) {
                    Swal.fire({
                        icon: "info",
                        title: "No Books Found",
                        text: `No books available for the genre "${value}".`,
                        confirmButtonText: "Okay",
                    });
                    
                    fetchBooks();
                    return;
                }
                setBooks(foundBook);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCart = async (bookId) => {
        try {
            const res = await addBookOtCart(bookId);
            if (res.status === 201) {
            Swal.fire({
                title: "Yay! New book added to Cart.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
            });
            enqueueSnackbar("Book Successfully added to cart", { variant: "success" });
            navigate("/customer/cart");
            }
        } catch(error) {
            if(error.response.status == 409) {
                Swal.fire({
                    title: "Book is already available Cart.",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6",
                });
            }
            else
                enqueueSnackbar("Failed to add book to cart", { variant: "error" });
        }
    };
    

    return (
        <>
            <div className="mb-6 mt-7 flex justify-center w-full">
                <div className="w-full max-w-xl">
                <Autocomplete
                    onChange={handleGenreChange}
                    options={genres}
                    value={selectedGenre}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Genre"
                        placeholder="Search book by genre"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        }}
                        className="border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                    )}
                />
                </div>
            </div>

            {expandedBookId && (
                <>
                <div className="fixed inset-0 bg-black/70 z-40" />
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="relative top-10 bg-white rounded-xl shadow-lg w-full max-w-5xl p-10 pointer-events-auto max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={() => setExpandedBookId(null)}
                        className="absolute top-4 cursor-pointer right-4 text-red-400 hover:text-red-600 hover:scale-120 text-3xl"
                    >
                        ×
                    </button>
                    {(() => {
                        const book = books.find((b) => b._id === expandedBookId);
                        if (!book) return null;
                        return (
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/2 flex justify-center items-center">
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="w-full max-h-[500px] object-contain rounded-lg"
                            />
                            </div>
                            <div className="md:w-1/2 flex flex-col gap-4 text-lg">
                            <h2 className="text-3xl font-bold">{book.title}</h2>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Description:</strong> {book.description}</p>
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <p><strong>Edition:</strong> {book.edition}</p>
                            <p><strong>Condition:</strong> {book.condition}</p>
                            <p><strong>Status:</strong> {book.status}</p>
                            <p className="text-2xl font-bold text-green-600 mt-4">${book.price}</p>
                            <div className="flex gap-4 mt-6">
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCart(book._id);
                                }}
                                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 hover:scale-105 transition"
                                >
                                    <ShoppingBasket size={18} />
                                        Add To Cart
                                </button>
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // handleCart(book._id);
                                }}
                                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 hover:scale-105 transition"
                                >
                                    <Package size={18} />
                                        Place Order
                                </button>
                            </div>
                            </div>
                        </div>
                        );
                    })()}
                    </div>
                </div>
                </>
            )}
            

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-20 justify-center relative">
                {books?.map((book) => (
                <div
                    key={book._id}
                    className="w-80 flex flex-col transition-all duration-300 ease-in-out rounded-xl bg-white shadow cursor-pointer"
                    onClick={() => setExpandedBookId(book._id)}
                >
                    <img
                    src={book.imageUrl}
                    alt="Book"
                    className="w-full h-60 object-cover rounded-t-lg"
                    />
                    <div className="p-6 flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">{book.title}</h2>
                    <p className="text-lg text-teal-900">
                        <strong>Author:</strong> {book.author}
                    </p>
                    <p className="text-md text-teal-900 font-semibold">{book.edition} Edition</p>
                    <p className="text-md text-yellow-700 font-semibold">Genre: {book.genre}</p>
                    <p className="text-md text-gray-500">Condition: {book.condition}</p>
                    <p className="text-2xl font-bold text-green-600">${book.price}</p>
                    </div>
                </div>
                ))}
            </div>
        </>
    );
}
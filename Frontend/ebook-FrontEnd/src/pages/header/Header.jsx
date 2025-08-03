import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { isAdminLoggedIn, isCustomerLoggedIn, removeToken } from '../../util/common';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const [isCustomer, setCustomer] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to Log out",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Log me out!",
            cancelButtonText: "No, cancel",
        });
        
        if (result.isConfirmed)  {
            setIsMenuOpen(false); 
            navigate('/')
            removeToken();
        }
    }
    useEffect(()=> {
        const fetchUserRoles = async () => {
            try{
                const isAdmin = await isAdminLoggedIn();
                const isCustomer = await isCustomerLoggedIn();

                setAdmin(isAdmin);
                setCustomer(isCustomer);
            }catch(error) {
                console.error("err in fetching role : ",error);
                
            }
        };
        fetchUserRoles();
    }, [location])

    return (
        <>
{/* please login first */}
        {!isCustomer && !isAdmin && (
            <header className="shadow sticky z-50 top-0 bg-gray-800">
            <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Left Section: Logo */}
                    <div className="flex items-center">
                        
                        <Link to="/" className="flex items-center ml-2 lg:ml-0">
                            <img
                                src={logo}
                                className="mr-3 h-12"
                                alt="Logo"
                            />
                        </Link>
                        <p>Book Store</p>
                    </div>

                    {/* Right Section: Links */}
                    <div className="hidden lg:flex items-center lg:order-2">
                        <Link
                            to="/register"
                            className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Register
                        </Link>
                        <Link
                            to="/login"
                            className="text-white bg-teal-950 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log In
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div
                            id="mobile-menu"
                            className="lg:hidden absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48"
                        >
                            <ul className="flex flex-col p-4 space-y-2">
                                <li>
                                    <Link
                                        to="/login"
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Log In
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                        <button
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>

                </div>
            </nav>
            </header>
        )}

{/* you are admin so here is admin's navbar */}
        {isAdmin && (
            <header className="shadow sticky z-50 top-0 bg-gray-500">
            <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Left Section: Logo */}
                    <div className="flex items-center">
                        
                        <Link to="/" className="flex items-center ml-2 lg:ml-0">
                            <img
                                src={logo}
                                className="mr-3 h-12"
                                alt="Logo"
                            />
                        </Link>
                        <strong>Admin</strong>
                    </div>

                    {/* Right Section: Links */}
                    <div className="hidden lg:flex items-center lg:order-2">
                        <Link
                            to="/admin/dashboard"
                            className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/admin/book/post"
                            className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Post Book
                        </Link>
                        <Link
                            to="/admin/book/orders"
                            className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Orders
                        </Link>
            
                        <Link
                            to="/login"
                            className="text-white bg-teal-950 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            onClick={()=>{removeToken();}}
                        >
                            Log Out
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div
                            id="mobile-menu"
                            className="lg:hidden absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48"
                        >
                            <ul className="flex flex-col p-4 space-y-2">
                                <li>
                                    <Link
                                        to="/admin/dashboard"
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/book/post"
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                    >
                                        Post Book
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/book/orders"
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                    >
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                        onClick={() =>{ setIsMenuOpen(false); removeToken()}}
                                    >
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                        <button
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>

                </div>
            </nav>
            </header>     
        )}

{/* you are customer so here is customer's navbar */}
        {isCustomer && (
            <header className="shadow sticky z-50 top-0 bg-gray-500">
            <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Left Section: Logo */}
                    <div className="flex items-center">
                        
                        <Link to="/" className="flex items-center ml-2 lg:ml-0">
                            <img
                                src={logo}
                                className="mr-3 h-12"
                                alt="Logo"
                            />
                        </Link>
                        <strong>Customer</strong>
                    </div>

                    {/* Right Section: Links */}
                    <div className="hidden lg:flex items-center lg:order-2">
                        <Link
                            to="/customer/dashboard"
                            className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/customer/cart"
                            className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Cart
                        </Link>
                        <Link
                            to="/customer/orders"
                            className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            My Orders
                        </Link>
                        <button
                            className="text-white bg-teal-950 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div
                            id="mobile-menu"
                            className="lg:hidden absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48"
                        >
                            <ul className="flex flex-col p-4 space-y-2">
                                <li>
                                    <Link
                                        to="/customer/dashboard"
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/customer/cart"
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Cart
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/customer/orders"
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        My Orders
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="block text-gray-800 hover:bg-gray-200 px-4 py-2 rounded"
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}

                        <button
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>

                </div>
            </nav>
            </header>     
        )}            

        </>
    );
}

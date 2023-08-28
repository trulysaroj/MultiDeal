import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import {
    StarFilled,
    ShoppingCartOutlined,
    HeartOutlined,
    HeartFilled, HomeOutlined
} from "@ant-design/icons";
// import { Skeleton } from 'antd';
import { addToCartList, addToWishList } from '@/Redux/reducerSlice/products';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Products from '../products';
import Link from 'next/link';
import ProductDetails from '../product-details/[itemId]';
import { Breadcrumb } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';






const Shop = () => {
    // <Skeleton active />
    const dispath = useDispatch();

    // Fetching all product
    const [products, setProducts] = useState([])
    const [sortOrder, setSortOrder] = useState('');

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:5000/products')
        const { data } = await res.json()
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    // For Wishlist icon change  
    const [clicked, setClicked] = useState(false);
    function handleClick() {
        setClicked(!clicked);


    }


    // Sorting --->
    useEffect(() => {
        sortProducts();
    }, [sortOrder]);

    const sortProducts = () => {
        // Create a copy of products array
        const sortedProducts = [...products];

        if (sortOrder === 'latest') {

            // TODO: Need to Fixed this part for accurate results
            sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        } else if (sortOrder === 'lowToHigh') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'highToLow') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOrder === 'A to Z') {
            sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
        }
        setProducts(sortedProducts);
    };


    const handleSortChange = event => {
        setSortOrder(event.target.value);
    };



    return (
        <>

            <Header />
            <div className="bg-indigo-50 h-2000px] w-full   -mt-7  px-12 py-10">
                <div>
                    <Breadcrumb
                        className="mt-2 mb-8 text-sm"
                        items={[
                            {
                                href: "/",
                                title: (
                                    <>
                                        <HomeOutlined />
                                        <span>Home</span>
                                    </>
                                ),
                            },
                            {
                                href: "/404",
                                title: (
                                    <>
                                        <span className="text-slate-800 hover:text-yellow-500"> Shop </span>
                                    </>
                                ),
                            },
                        ]}
                    />
                </div>


                <div className='flex items-center justify-between border border-gray-300 rounded-md px-8 text-slate-800 text-md py-4'>
                    <div>
                        <p className=''>Showing 1 – 9 of {products.length} results</p>
                    </div>

                    <div>
                        <select className='bg-indigo-50 outline-0 border px-3 py-1.5' name="pets" value={sortOrder} onChange={handleSortChange}>
                            <option value="">Sort Filtering</option>
                            <option value="latest">Latest Product</option>
                            <option value="lowToHigh">Price low to high</option>
                            <option value="highToLow">Price high to low</option>
                            <option value="A to Z"> A to Z</option>

                        </select>





                    </div>
                </div>



                {/* Card Ternery  */}
                {products.length > 0 ? (

                    // <div className="product flex justify-between gap-8 space-y-12 flex-wrap mt-9">
                    <div className="w-full  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

                        {products.map((item) => {
                            return <Link href={`/product-details/${item._id}`} key={item._id} component={ProductDetails}>
                                <div className="flash  product flex  justify-between   mt-9">

                                    <div className="productbox flex-col" >
                                        {/* <div className=" h-[365px] w-[280px] bg-white hover:shadow-xl  hover:outline hover:outline-yellow-500 hover:outline-1  transition duration-1000 ease-in-out cursor-pointer "> */}
                                        <div className="w-[280px] bg-white text-black  border border-gray-300 rounded-lg group overflow-hidden    hover:outline hover:outline-yellow-400 hover:outline-1  transition duration-1000 ease-in-out">
                                            {/* Heart & tag */}
                                            <div className="heart flex items-center justify-between mt-1 pt-3 px-3">
                                                <div className="tag bg-green-500 w-12 text-xs text-white rounded-lg   h-5 text-center ">New Product</div>

                                                <div onClick={() => {
                                                    // dispath(addToWishList({ ID: item._id, title: item.productName, price: item.price, image: 'http://localhost:5000/product-img/' + item._id }));
                                                    dispath(addToWishList({ ID: item._id, title: item.productName, price: item.price, image: 'http://localhost:5000/product-img/' + item._id }));
                                                    toast.success(`${item.productName} added to your Wish List`);


                                                }} className=" hover:scale-125">
                                                    <HeartFilled onClick={handleClick} className='text-rose-400' />

                                                    {/* {clicked ?
                                                    <HeartFilled onClick={handleClick} className='text-rose-400' /> :
                                                    <HeartOutlined onClick={handleClick} className="cursor-pointer text-rose-400 product text-md pl-3 mt-3" />} */}
                                                </div>

                                            </div>

                                            {/* Image */}

                                            <Image
                                                src={'http://localhost:5000/product-img/' + item._id}
                                                alt="apple watch"
                                                width={380}
                                                height={380}
                                                srcset=""
                                                // className="   transition duration-300 ease-in-out cursor-pointer"
                                                className="w-full z-10 h-full cursor-pointer -mt-4 object-cover scale-90 hover:scale-100 transition-transform duration-300"

                                            />
                                            <div className='px-3 -mt-5'>
                                                <hr />

                                            </div>

                                            {/* Name & Price */}
                                            <div className="discription ml-3 mb-1.5 mt-1 ">
                                                <p className="text-xs text-gray-400 tracking-wide">{item.category}</p>
                                                <Link href={`/product-details/${item._id}`} key={item._id} component={ProductDetails}>
                                                    <h1 className="text-slate-800 font-semibold hover:font-semibold hover:text-yellow-500 text-lg mt-0.5 ">
                                                        {item.productName}
                                                    </h1>
                                                </Link>



                                                <div className="flex items-end gap-1.5 -mt-1">

                                                    <p className="text-green-500 text-xl font-semibold">Rs.{item.price}</p>{" "}
                                                    <p className="text-gray-500 text-normal line-through font-light">
                                                        Rs.4500
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="rating pb-3  px-3">
                                                {" "}
                                                <StarFilled className="text-yellow-500 text-sm" />{" "}
                                                <StarFilled className="text-yellow-500 text-sm" />{" "}
                                                <StarFilled className="text-yellow-500 text-sm" />{" "}
                                                <StarFilled className="text-yellow-500 text-sm" />{" "}
                                                <StarFilled className="text-yellow-500 text-sm" />
                                            </div>

                                            {/* Button */}
                                            <div className="flex  justify-center items-center   -mt-1.5">
                                                <button onClick={() => {
                                                    dispath(addToCartList({ ID: item._id, title: item.productName, price: item.price, image: 'http://localhost:5000/product-img/' + item._id }));
                                                    toast.success(`${item.productName} added to cart`);
                                                }} className="btn bg-slate-800 hover:outline hover:bg-yellow-500 hover:outline-yellow-500 hover:outline-1  transition duration-500  flex  gap-2 justify-center items-center ease-out text-white w-[280px] py-2.5 ">
                                                    {" "}
                                                    <ShoppingCartOutlined classID="add mr-2" />  Add to cart
                                                </button>
                                                <ToastContainer
                                                    position="top-center"

                                                    autoClose={3000}
                                                    hideProgressBar={false}
                                                    newestOnTop={false}
                                                    closeOnClick
                                                    rtl={false}
                                                    pauseOnFocusLoss
                                                    draggable
                                                    pauseOnHover
                                                    theme="light"
                                                />
                                            </div>

                                        </div>
                                    </div>

                                    {/* <Skeleton /> */}
                                </div>
                            </Link>


                        })}


                    </div>

                ) : 'Loading'}



            </div>

            <Footer />
        </>

    )
}






export default Shop

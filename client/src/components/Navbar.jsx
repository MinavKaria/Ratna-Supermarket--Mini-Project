
import React,{ useState,useEffect } from "react";
import Fuse from "fuse.js";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Input } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useCart} from '../actions/CartControl';
import SimpleDialog from "./SimpleDialog";
import SimpleDialog2 from "./SimpleDialog2";
import SimpleDialog3 from "./SimpleDialog3";
import axios from 'axios';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [datas, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setIsLogin(true);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("https://ratna-supermarket.vercel.app/allProducts");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  },[]);
  

  const options = {
    keys: ["label"],
    includeScore: true,
    threshold: 0.4, 
  };

  const data = [
  
  ];

  for(let i=0;i<datas.length;i++){
    data.push({label:datas[i].productName, id:datas[i].id});
  }


  const fuse = new Fuse(data, options);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const results = fuse.search(value);
      setSearchResults(results.map((result) => result.item));
    } else {
      setSearchResults([]);
    }
  };
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  }

  const handleClickOpen3 = () => {
    setOpen3(true);
  }

  const handleClose2 = (value) => {
    setOpen2(false);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };



  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  

  const { cartItems, addToCart,isLogin, setIsLogin,name,setName,userDetails,setUserDetails } = useCart();
  const userDetail = JSON.parse(localStorage.getItem('user'));

  

  return (
    <>
    <nav className="bg-white p-4 shadow-md fixed top-0 z-50 w-full">
      <div className="container mx-auto md:flex items-center justify-start relative sm:block ">
        <div className="text-white text-2xl font-bold mb-4 md:mb-0 md:mr-4 cursor-pointer  sm:flex sm:justify-center sm:items-center" onClick={()=>{
          navigate('/');
        }}>
          <img src="/logo.svg" alt="" className="md:w-[175px] sm:w-[100px] " />
        </div>

        <div className="md:flex md:justify-start md:items-start md:w-6/12 sm:hidden">
          <button className="mb-4 md:mb-0 md:mr-4 flex flex-row justify-center align-middle items-center gap-3 bg-gray-100 rounded-l-full rounded-r-full p-4 px-8" onClick={handleClickOpen}>
            <img src="/location.svg" alt="" />
            <div className="flex justify-start text-left text-base flex-col">
              <span className="font-bold m-0">{localStorage.getItem('userArea') || 'Mumbai'} </span>
              <span className="m-0">{localStorage.getItem('userPincode') || '400001'}</span>
            </div>
            <img src="/dropdown_nav.svg" alt="" />
          </button>
          <button className="mb-4 md:mb-0 md:mr-4 flex flex-row justify-center align-middle items-center gap-3 bg-gray-100 rounded-l-full rounded-r-full p-4 px-8 h-[70px]" onClick={handleClickOpen2}>
            <div className="flex justify-start text-left text-base flex-col">
              <span className="font-bold m-0 w-">{localStorage.getItem('orderType')||'Delivery'}</span>
            </div>
            <img src="/dropdown_nav.svg" alt="" />
            <img src="carbon_delivery.svg" alt="" />
          </button>
        </div>

        

        <div className={`flex md:justify-end md:flex gap-5 w-full relative sm:block sm:w-full`}>
          <div className="flex flex-row justify-center items-center align-middle gap-6 mb-4">
            <button className="text-white focus:outline-none md:hidden" onClick={toggleMobileMenu}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                  <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                  <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <div className="flex-grow bg-slate-100 md:mb-0 flex flex-row rounded-r-full rounded-l-full pl-10 pr-10 relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full py-2 rounded bg-transparent text-black focus:outline-none sm:w-full"
            />

            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-white shadow-lg rounded w-full z-50">
                {searchResults.map((result) => (
                  <div key={result.label} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={()=>{
                    setSearchTerm(`${result.label}`);
                    setSearchResults([]);
                    navigate(`/product/${result.id}`);
                  }}>
                    {result.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>
          
             <button className="p-2 bg-white shadow-md rounded sm:hidden">
              <img src="/search.svg" alt="" />
            </button>

          <div className="md:flex items-center space-x-4 sm:hidden mx-10 gap-5">
           
              {!isLogin ? (
                <>
                <div className="flex" onClick={()=>{
                navigate('/sign');
              }}>
                  <img src="user.svg" alt=""/>
                  <button 
                  className=" " 
                  >Login</button>
                    </div>
                </>
              ):(
                <>
                <div className="flex" onClick={()=>{
                setOpen3(true);
                }}>
                  <img src={userDetail.photoURL || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} alt="" className=" rounded-full w-10 mr-5" />
                  <button 
                  className="w-[2vh] h-[2vh]"
                  onClick={()=>{
                    
                  
                  }} 
                  ></button>
                    </div>
                </>
              
              )}
             
          
            <div className="flex relative" onClick={()=>{
              // addToCart({id:1, name:'Product 1', price:100, qty:1});
              navigate('/cart');
            }}>
            <img src="cart.svg" alt="" />
            <button className="pr-5 " >
                Cart 
            </button>
            <div className="absolute top-0 right-0 w-4 bg-lime-400 rounded-full h-4 text-xs text-white text-center ">
            {cartItems.length}
            </div>
            </div>
            
            <div className="flex gap-2">
            <img src="my-orders-icon.svg" alt="" className="w-5" />
            <button className="" onClick={()=>{
              if(!isLogin){
                navigate('/sign');
              }
              else
              {
                navigate('/orders');
                }
            }}>
                My Orders
            </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />

    <SimpleDialog2
        open={open2}
        onClose={handleClose2}
        handleOption={(value)=>{
          localStorage.setItem('orderType',value);
          handleClickOpen2();
        }}
      />

    <SimpleDialog3
        open={open3}
        onClose={handleClose3}
        setIsLogin={setIsLogin}
        />

      
    </>
  );
};

export default Navbar;




import {
    chevronDown,
    chevronDownGreen,
    heart,
    mapPin,
    phoneNumber,
    search,
    shop,
    user,
  } from '@/assets'
  import Logo from '../Logo'
  
  
  export default function Navbar() {
    return (
      <div>
        <header className="flex items-center justify-between p-2 bg-green-50 text-white">
          <div className="mx-56 flex text-center items-center">
            <div className="w-8 h-8 flex items-center justify-center">
              <a href="">
                <img src={mapPin.src} alt="" />
              </a>
            </div>
            <span className="text-center text-sm text-green-800">
              Store Location: 366, Gaya, Busan, South Korea
            </span>
          </div>
          <div className="flex space-x-4 mx-56 text-center items-center">
            <a href="#" className="text-green-800">
              Eng
            </a>
            <img src={chevronDownGreen.src} alt="" />
            <a href="#" className="text-green-800">
              USD
            </a>
            <img src={chevronDownGreen.src} alt="" />
          </div>
        </header>
        <header className="mx-56 flex items-center justify-between p-4 bg-white text-white">
          <div className="space-x-4 flex">
            <div className="flex items-center gap-1">
              <a href="#" className="text-gray-900">
                Home
              </a>
              <img src={chevronDown.src} alt="" />
            </div>
            <div className="flex items-center gap-1">
              <a href="#" className="text-gray-900">
                Shop
              </a>
              <img src={chevronDown.src} alt="" />
            </div>
            <div className="flex items-center gap-1">
              <a href="#" className="text-gray-900">
                Pages
              </a>
              <img src={chevronDown.src} alt="" />
            </div>
            <div className="flex items-center gap-1">
              <a href="#" className="text-gray-900">
                Blog
              </a>
              <img src={chevronDown.src} alt="" />
            </div>
            <a href="#" className="text-gray-900">
              About Us
            </a>
          </div>
          <div className="mx-auto">
            <Logo />
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 flex items-center justify-center">
              <a href="">
                <img src={phoneNumber.src} alt="" />
              </a>
            </div>
            <span className="mr-4 text-gray-900">Ecobazar</span>
            <div className="w-8 h-8 flex items-center justify-center">
              <a href="">
                <img src={search.src} alt="" />
              </a>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <a href="">
                <img src={heart.src} alt="" />
              </a>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <a href="">
                <img src={shop.src} alt="" />
              </a>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <a href="">
                <img src={user.src} alt="" />
              </a>
            </div>
          </div>
        </header>
      </div>
    )
  }
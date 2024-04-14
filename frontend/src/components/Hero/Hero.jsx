// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.css';
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import Vision from '../../assets/1.png'

const Hero = () => {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={Vision} alt={`Vision`} className='rounded-4'/>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Hero;

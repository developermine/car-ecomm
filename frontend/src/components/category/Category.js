import React from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import makes from '../../categories';
const Category = () =>  {
   
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]
        };
        return (
            <div style={{ background: '#fff' }}>
                <div className="container" id="header-category-bk">
                    <Slider {...settings}>

                        {makes.map((makes, index) => {
                            return (
                                <div className="item" key={index}>
                                    <div className="category-item">
                                        <Link to={{
                                            pathname: `/makes/${makes.make.toLocaleLowerCase()}`,
                                        }}>
                                            <img className="img-fluid" src={makes.img} alt={makes.make} />
                                            <h6>{makes.make}</h6>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider >
                </div>
            </div >
        )
    
}

export default Category;
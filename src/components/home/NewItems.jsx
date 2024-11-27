import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});

  async function getNFTs() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    // Log the response to check the data structure
    console.log("API Response:", response.data);

    setNewItems(response.data);
    setLoading(false);
  }
  
  useEffect(() => {
    getNFTs();
  }, []);
  
  // Helper function to calculate remaining time
  const calculateTimeRemaining = (expiryDate) => {
    const now = new Date().getTime();
    return expiryDate - now;
  };
  
  // Starts the countdown for each NFT
  useEffect(() => {
    const intervals = {};

     // Start countdown for each NFT
     newItems.forEach((nft) => {
      if (nft.expiryDate) {
        intervals[nft.id] = setInterval(() => {
          const remainingTime = calculateTimeRemaining(nft.expiryDate);

          setCountdowns((prev) => ({
            ...prev,
            [nft.id]: remainingTime <= 0 ? 0 : remainingTime,
          }));

          if (remainingTime <= 0) {
            clearInterval(intervals[nft.id]);
          }
        }, 1000);
      }
    });

    // Cleanup intervals when component unmounts
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [newItems]);
  
  // Formats the time to hours, minutes, & seconds
  const formatTime = (time) => {
    if (time <= 0) return "Expired";
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  
  const settings = {
    arrows: true,
    speed: 300,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <h2>Loading NFTs...</h2>;

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
            
              <Slider {...settings}>
                {newItems.map((nft) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={nft.id}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${nft.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={nft.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div>
                        {/* Only show countdown if expiryDate is present */}
                        {nft.expiryDate ? (
                          <div className="de_countdown">
                            {countdowns[nft.id] > 0
                              ? formatTime(countdowns[nft.id])
                              : "Expired"}
                          </div>
                        ) : (
                          // Show nothing if no expiryDate
                          <div></div>
                        )}
                      </div>
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{nft.title}</h4>
                        </Link>
                        <div className="nft__item_price">{nft.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          
        </div>
      
    </section>
  );
};

export default NewItems;

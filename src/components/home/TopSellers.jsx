import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    getSellers();
  }, []);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1300,  // Animation duration
      once: true,      // Only trigger the animation once
    });

    // Refresh AOS after data is loaded to recalculate animations
    if (!loading) {
      AOS.refresh();  // Trigger a refresh so AOS can detect newly loaded content
    }

    return () => {
      // Cleanup AOS when the component unmounts
      AOS.refreshHard();
    };
  }, [loading]);  // Only run this effect when loading state changes

  if (loading) {
    // Display skeleton loader if data is still loading
    return (
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-md-12">
              <ol className="author_list">
                {[...Array(12)].map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div className="seller_skeleton-img"></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <div className="seller_skeleton-name"></div>
                      <div className="seller_skeleton-price"></div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-in">
            <ol className="author_list">
              {sellers.map((seller) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>
                      {seller.authorName}
                    </Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

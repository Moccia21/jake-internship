import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";
import SkeletonLoader from "../UI/SkeletonLoader"; // Import the SkeletonLoader component

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8); // Initial number of items to display
  const [sortOption, setSortOption] = useState("");

  async function getExploreItems() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setItems(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getExploreItems();
  }, []);

   // Handle sorting of items with a delay to show skeleton loader
   const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    setLoading(true); // Start showing the skeleton loader

    // Set a timeout to simulate loading state for 2 seconds
    setTimeout(() => {
      let sortedItems = [...items];

      if (option === "price_low_to_high") {
        sortedItems.sort((a, b) => a.price - b.price);
      } else if (option === "price_high_to_low") {
        sortedItems.sort((a, b) => b.price - a.price);
      } else if (option === "likes_high_to_low") {
        sortedItems.sort((a, b) => b.likes - a.likes);
      }

      setItems(sortedItems);
      setLoading(false); // Hide the skeleton loader after the delay
    }, 1000); // 2-second delay to show the skeleton loader
  };

  // Show more NFTs function
  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 4); // Increase displayed items by 4
  };

  if (loading) {
    return (
      <div className="row">
        {[...Array(displayCount)].map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <SkeletonLoader />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Filter dropdown */}
        <select
          id="filter-items"
          defaultValue={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      <div className="row">
        {items.slice(0, displayCount).map((nft) => (
          <div
            key={nft.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${nft.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={nft.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {/* Only render Countdown if expiryDate is not null */}
              {nft.expiryDate ? (
                <Countdown expiryDate={nft.expiryDate} />
              ) : null}

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
                <Link to={`/item-details/${nft.nftId}`}>
                  <h4>{nft.title}</h4>
                </Link>
                <div className="nft__item_price">{nft.price}</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{nft.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button */}
      {displayCount < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleShowMore} className="btn-main lead">
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;

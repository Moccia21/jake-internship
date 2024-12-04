import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AuthorItems = () => {
  const { authorId } = useParams(); // Get the authorId from URL param
  const [authorItems, setAuthorItems] = useState([]); // Start with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // For capturing errors

  async function getAuthorItems() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );

      setAuthorItems(response.data);
      setLoading(false); // Set loading to false after data fetch
    } catch (error) {
      console.error("Error fetching author items:", error);
      setLoading(false); // Set loading to false after an error
      setError("Failed to load items"); // Set an error message
      setAuthorItems([]); // Set empty array in case of error
    }
  }

  useEffect(() => {
    getAuthorItems();
  }, [authorId]); // Fetch data whenever authorId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  // Destructure properties for each item
  const {
    id,
    authorImage,
    nftCollection: { nftImage, nftId, title, price, likes },
  } = authorItems;

  return (
    <>
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
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
                  <Link to={`/item-details/${nftId}`}>
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nftId}`}>
                    <h4>{title}</h4>
                  </Link>
                  <div className="nft__item_price">{price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorItems;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AuthorItems = () => {
  const { authorId } = useParams(); // Get the authorId from URL param
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAuthorItems() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      console.log("API Response:", response.data);  // Log the response to verify its structure
      if (Array.isArray(response.data)) {
        setAuthorItems(response.data);
      } else {
        console.error("Expected an array, but got:", response.data);
        setAuthorItems([]);  // If the response is not an array, set an empty array
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching author items:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuthorItems();
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
        {authorItems.map((data) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={data.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={data.authorImage} alt="" />
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
                  <Link to={`/item-details/${data.nftCollection.nftId}`}>
                    <img
                      src={data.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${data.nftCollection.nftId}`}>
                    <h4>{data.nftCollection.title}</h4>
                  </Link>
                  <div className="nft__item_price">{data.nftCollection.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{data.nftCollection.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;

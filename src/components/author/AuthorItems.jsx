import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonLoader from "../UI/SkeletonLoader"; // Import the SkeletonLoader component

const AuthorItems = () => {
  const { authorId } = useParams();
  const [nftCollection, setNftCollection] = useState([]);
  const [authorImage, setAuthorImage] = useState("");
  const [loading, setLoading] = useState(true);

  async function getAuthorItems() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      console.log("API Response:", response.data);

      // Extract nftCollection array and authorImage from the response
      const { nftCollection: nfts, authorImage: image } = response.data;
      setNftCollection(nfts || []);
      setAuthorImage(image);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching author items:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuthorItems();
  }, [authorId]); // Added authorId as dependency

  if (loading) {
    return (
      <div className="row">
       {[...Array(8)].map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <SkeletonLoader />
          </div>
        ))}
      </div>
    );
      
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
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
      </div>
    </div>
  );
};

export default AuthorItems;

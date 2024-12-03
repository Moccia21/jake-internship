import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams(); // Get the nftId from URL param
  const [nftItem, setNftItem] = useState(null);  // nftItem as an object, not an array
  const [loading, setLoading] = useState(true);

  async function getNftItems() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      console.log("API Response:", response.data);  // Log the response to verify its structure
      
      setNftItem(response.data);  // Set the NFT item response to the state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching NFT details:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getNftItems();
  }, [nftId]);  // Fetch new data when nftId changes

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="details_skeleton details_skeleton-image"></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div className="details_skeleton details_skeleton-title"></div>
  
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <div className="details_skeleton details_skeleton-box"></div>
                      </div>
                      <div className="item_info_like">
                        <div className="details_skeleton details_skeleton-box"></div>
                      </div>
                    </div>
                    <p className="details_skeleton details_skeleton-para"></p>
  
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="details_skeleton details_skeleton-img"></div>
                          </div>
                          <div className="author_list_info">
                            <div className="details_skeleton details_skeleton-name"></div>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="details_skeleton details_skeleton-img"></div>
                          </div>
                          <div className="author_list_info">
                            <div className="details_skeleton details_skeleton-name"></div>
                          </div>
                        </div>
                      </div>
  
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="details_skeleton details_skeleton-price"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!nftItem) {
    return <div>No item found</div>;  // Handle case where no data is found
  }

  // Destructuring nftItem to extract data for easier use in JSX
  const {
    title,
    tag,
    views,
    likes,
    description,
    price,
    ownerImage,
    ownerName,
    ownerId,
    creatorId,
    creatorImage,
    creatorName,
    nftImage: nftImageUrl,  // Renamed to avoid conflict with imported variable
  } = nftItem;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftImageUrl || nftImage}  // Default to local nftImage if none is found
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt="NFT"
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title} #{tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {likes}
                    </div>
                  </div>
                  <p>{description}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${ownerId}`}>
                            <img className="lazy" src={ownerImage} alt={ownerName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${ownerId}`}>{ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${creatorId}`}>
                            <img className="lazy" src={creatorImage} alt={creatorName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${creatorId}`}>{creatorName}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;

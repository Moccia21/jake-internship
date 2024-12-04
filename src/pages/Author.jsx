import { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [followed, setFollowed] = useState(false); // State to track follow status
  const [followersCount, setFollowersCount] = useState(0); // State to track followers count

  async function getAuthorData() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthorData(response.data);
      setLoading(false);
      setFollowersCount(response.data.followers); // Set the initial follower count from the fetched data
    } catch (error) {
      console.error("Error fetching author items:", error);
      setError("Failed to load author data");
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuthorData();
  }, [authorId]); // Added authorId as dependency

  const handleFollowToggle = () => {
    if (followed) {
      setFollowersCount(followersCount - 1); // Decrease follower count if unfollowing
    } else {
      setFollowersCount(followersCount + 1); // Increase follower count if following
    }
    setFollowed(!followed); // Toggle the follow status
  };

  if (loading) {
    return (
      <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <div className="author_skeleton-img"></div>
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          <div className="author_skeleton-text"></div>
                          <span className="profile_username author_skeleton-text"></span>
                          <span id="wallet" className="profile_wallet author_skeleton-text">
                            
                          </span>
                        
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                  
                      </div>
                      <button 
                         
                        className="btn-main follow_skeleton">
                        
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    )
  }



  if (error) return <div>{error}</div>;
  if (!authorData) return <div>No author data found</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">{authorData.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followersCount} followers
                      </div>
                      <button 
                        onClick={handleFollowToggle} 
                        className="btn-main">
                        {followed ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;

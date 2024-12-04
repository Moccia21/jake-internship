import { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams(); // Get the authorId from URL param
  const [authorData, setAuthorData] = useState({});  // Initializing as an object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors

  // Fetching author data from the API
  async function getAuthorData() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      console.log(response.data);  // Log the response to check the structure

      setAuthorData(response.data); // Save the response data to the state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching author data:", error);
      setError("Failed to load author data");
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuthorData();
  }, [authorId]);  // Refetch data when authorId changes

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while fetching
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if there was an error
  }

  // Destructuring author data
  const {
    id,
    authorName,
    tag,
    address,
    authorImage,
    followers,
  } = authorData || {};  // Use fallback to prevent errors if authorData is undefined

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
              <div className="col-md-12" key={id}>
                {/* Profile Section */}
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorImage} alt={authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorName}
                          <span className="profile_username">{tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {address}
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
                      <div className="profile_follower">{followers} followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
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

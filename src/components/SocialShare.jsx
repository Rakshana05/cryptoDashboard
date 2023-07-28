import React from 'react';
import { EmailShareButton, EmailIcon, FacebookIcon, TwitterIcon, LinkedinIcon, FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

const SocialShare = ({ url, title }) => {
  return (
    <div className="d-flex justify-content-center">
      {/* <h3>Share this on social media:</h3> */}
      <EmailShareButton url={url} subject={title}>
        <EmailIcon />
      </EmailShareButton>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon />
      </LinkedinShareButton>
    </div>
  );
};

export default SocialShare;

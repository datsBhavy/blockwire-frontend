import { createResource } from "solid-js";

const fetchInstagramFeed = async () => {
  const response = await fetch(
    "https://graph.instagram.com/me/media?fields=id,caption,media_url,thumbnail_url,permalink&access_token=YOUR_ACCESS_TOKEN"
  );
  return response.json();
};

const InstagramFeed = () => {
  const [feed] = createResource(fetchInstagramFeed);

  return (
    <div>
      {feed()?.data.map((post) => (
        <a href={post.permalink} target="_blank">
          <img src={post.media_url || post.thumbnail_url} alt={post.caption} />
        </a>
      ))}
    </div>
  );
};

export default InstagramFeed;
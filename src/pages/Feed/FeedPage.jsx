import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { firebaseApp } from "../../config/firebaseConfig";
import "./FeedPage.css";

const db = getFirestore(firebaseApp);

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    const postQuery = lastVisible
      ? query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(20)
        )
      : query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(20));

    const postSnapshot = await getDocs(postQuery);
    const newPosts = postSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts((prev) => [...prev, ...newPosts]);
    setLastVisible(postSnapshot.docs[postSnapshot.docs.length - 1]);
    setLoading(false);
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    )
      return;
    fetchPosts();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

const Post = ({ post }) => {
  return (
    <div className="post-container">
      {/* Avatar and User Info */}
      <div className="user-info">
        <img src={post.avatar} alt={post.user} className="avatar" />
        <div>
          <h1>{post.user}</h1>
          <p>{timeAgo(post.createdAt?.seconds)}</p>
        </div>
      </div>
      {/* Post Content */}
      <p className="content">{post.content}</p>
      {/* Media */}
      <div className="media-container">
        {post.media?.map((media, index) => (
          <div key={index}>
            {media.type === "image" ? (
              <img src={media.url} alt="Post media" className="media" />
            ) : (
              <video src={media.url} controls className="media" />
            )}
          </div>
        ))}
      </div>
      {/* Likes and Actions */}
      <div className="actions">
        <div className="likes">❤️ {post.likes}</div>
        <button className="share-button">Share</button>
      </div>
    </div>
  );
};

// Helper to display "time ago"
const timeAgo = (timestamp) => {
  const secondsAgo = Math.floor((Date.now() / 1000 - timestamp) / 60);
  if (secondsAgo < 60) return `${secondsAgo} mins ago`;
  const hoursAgo = Math.floor(secondsAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hours ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo} days ago`;
};

export default FeedPage;

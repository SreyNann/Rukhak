import PostList from "./posts/PostList";
import { Route, Routes } from "react-router-dom";
import Post from "./posts/Post";
import Profile from "./profile/Profile";

const ForumPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/new-post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default ForumPage;

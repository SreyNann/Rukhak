import { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import Gallery from "./Gallery";
import UserCard from "./UserCard";
import { useReactPostMutation } from "@/features/api/post.api";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "@/features/auth/authSlice";

const PostCard = ({ post }) => {
  const reactCount = new Map(Object.entries(post.reactions));
  const userId = useSelector((state) => selectCurrentUserId(state));
  const navigate = useNavigate();
  const [toggleReaction] = useReactPostMutation();

  const [liked, setLiked] = useState(reactCount.get(userId));
  const handleReaction = async (e) => {
    e.preventDefault();
    await toggleReaction({ postId: post._id, userId });
    setLiked((prevLiked) => !prevLiked);
  };

  // Truncate title and content
  const truncatedTitle =
    post.title.length > 30 ? post.title.substring(0, 30) + "..." : post.title;
  const truncatedContent =
    post.content.length > 80
      ? post.content.substring(0, 80) + "..."
      : post.content;

  return (
    <Card sx={{ backgroundColor: "white", borderRadius: "12px" }}>
      <UserCard author={post.author} postId={post._id} />
      <CardContent sx={{ padding: 0 }}>
        <Gallery media={post.media} />
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ padding: "0.5rem 1rem 0 1rem" }}
        >
          {truncatedTitle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ padding: "0 1rem" }}
        >
          {truncatedContent}
        </Typography>
      </CardContent>
      <CardActions>
        <Box>
          <IconButton
            aria-label="love"
            onClick={handleReaction}
            color={liked ? "error" : "default"}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
          <span>{reactCount.size}</span>
        </Box>

        <Box>
          <IconButton onClick={() => navigate(`/${post._id}/comments`)}>
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton>
          <span>{post.commentCounts}</span>
        </Box>
        <Box>
          <IconButton aria-label="option">
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;

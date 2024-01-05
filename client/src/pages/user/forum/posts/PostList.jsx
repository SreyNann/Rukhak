import { useGetAllPostsQuery } from "@/features/api/post.api";
import PostDetail from "./PostDetail";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ForumHeader from "@/components/user/forum/ForumHeader";
import ForumButtomBar from "@/components/user/forum/ForumButtomBar";

const PostList = () => {
  const { data, isLoading, isError, error } = useGetAllPostsQuery();
  console.log(data);
  return (
    <Box>
      <ForumHeader />
      {isLoading ? (
        <Box
          minHeight={"100vh"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Stack minHeight={"100vh"} gap={2} padding={2}>
          {data?.data.docs.map((post) => {
            return <PostDetail post={post} key={post._id} />;
          })}
        </Stack>
      )}
      <ForumButtomBar />
    </Box>
  );
};

export default PostList;

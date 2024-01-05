import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useGetAllFollowingQuery } from "@/features/api/follow.api";

import UserCard from "@/components/user/forum/UserCard";

export default function Following({ userId }) {
  const { data, isLoading } = useGetAllFollowingQuery(
    { userId },
    {
      skip: userId ? false : true,
    }
  );

  console.log(data?.data, userId);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data?.data.map((user) => {
        return (
          <ListItem key={user._id} disablePadding>
            <UserCard author={user.targetId} />
          </ListItem>
        );
      })}
    </List>
  );
}

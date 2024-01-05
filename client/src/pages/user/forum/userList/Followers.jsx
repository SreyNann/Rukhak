import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useGetAllFollowersQuery } from "@/features/api/follow.api";
import UserCard from "@/components/user/forum/UserCard";

export default function Followers({ userId }) {
  const { data, isLoading } = useGetAllFollowersQuery(
    { userId },
    {
      skip: userId ? false : true,
    }
  );

  console.log(data, userId);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data?.data.map((user) => {
        console.log(user);
        return (
          <ListItem key={user} disablePadding>
            <UserCard author={user.sourceId} />
          </ListItem>
        );
      })}
    </List>
  );
}

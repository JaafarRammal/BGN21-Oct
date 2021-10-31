import { Avatar, Card, CardContent, Chip, Typography } from "@mui/material";
import { User } from "../Helpers/User";
export default function UserProfile(props: any) {
  const user: User = props.user;
  return (
    <Card sx={{ maxWidth: 500 }} className="container" style={{ marginTop: "20px" }}>
      <CardContent style={{ alignItems: "center" }}>
        <Avatar sx={{ height: "100px", width: "100px", margin: "0 auto", fontSize: "45px" }}>{(user.firstName[0] + user.secondName[0]).toUpperCase()}</Avatar>
        <Typography style={{paddingTop: "20px", textAlign: "center", }} variant="h4">{user.firstName + " " + user.secondName}</Typography>
        <Typography style={{paddingTop: "20px" }} variant="h6">Stats</Typography>
        <Typography>Owned Projects: {user.ownedProjects.length}</Typography>
        <Typography>Joined Projects: {user.joinedProjects.length}</Typography>
        <Typography>Liked Projects: {user.likedProjects.length}</Typography>
        <Typography style={{paddingTop: "20px"}} variant="h6">Languages</Typography>
        {user.languages.map((language, index) => {
          return <Chip style={{margin: "5px"}} label={language} key={index} variant="outlined" />
        })}
        <Typography style={{paddingTop: "20px"}} variant="h6">Hobbies</Typography>
        {user.hobbies.map((hobby, index) => {
          return <Chip style={{margin: "5px"}} label={hobby} key={index} variant="outlined" />
        })}
        <Typography style={{paddingTop: "20px"}} variant="h6">Tags</Typography>
        {user.tags.map((tag, index) => {
          return <Chip style={{margin: "5px"}} label={tag} key={index} variant="outlined" />
        })}
      </CardContent>
    </Card>
  );
}

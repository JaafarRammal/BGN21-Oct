import { User } from "../Helpers/User";

export default function UserProfile(props: any){
  const user: User = props.user;
  return <div>I have a user with the name {user.firstName} {user.secondName}</div>
}
import { FunctionComponent } from "react";
import { IUser } from "./IUser";
import LadderItem from "./LadderItem";

interface LadderListProps {
    arrUser:Array<IUser>
}
 
const LadderList: FunctionComponent<LadderListProps> = ({arrUser}) => {
    return ( 
        <div className="ladder-list">
            <ul>
            {arrUser.map(
                    (user,key) => <LadderItem key={user.Id} user={user} id={key+1}></LadderItem>
                )
            }
            </ul>

        </div>
     );
}
 
export default LadderList;
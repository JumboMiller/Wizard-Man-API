import { FunctionComponent } from "react";
import { IUser } from "./IUser";

interface LadderItemProps {
    user:IUser
    id:number
}
 
const LadderItem: FunctionComponent<LadderItemProps> = ({user,id}) => {
    return ( 
        //<div className="Ladder-item">
       //     <h3>{user.Twitter}</h3>
//     <h3>{user.BitCoinWallet}</h3>

      //  </div>
        <li className="wallet-row">
            <label className="wallet-label"><i>{id}.</i><p>{user.Twitter}</p> <p>{user.BitCoinWallet}</p> <p>Score:{user.Score}</p>  </label>
        </li>
     );
}
 
export default LadderItem;
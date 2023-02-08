import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";


const Private = ( {children} ) => {

    const { loading, signed } = useContext(UserContext);

    if(loading){
        return <div></div>
    }

    if(!signed){
        return <Navigate to="/" />
    }

    return children;
}

export default Private;
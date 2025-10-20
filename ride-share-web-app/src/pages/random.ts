import { useEffect } from "react";
import { api } from "../utils/api";

export default function Home(){
    const mut = api.post.createRideOpportunity.useMutation(); 
    useEffect(() => {
        mut.mutate({
            driverId: "cmgyvhoa40001sb312chwml7f", 
            stops: [[1,1],[2,2]],
            arrivalTime: "",
        });
    }, []);
}
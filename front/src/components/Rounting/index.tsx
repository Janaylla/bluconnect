import RoutingMachine from "./RoutineMachineLayer";
import { useState, useEffect } from "react";

interface RoutingProps {
  waypoints: Array<[number, number]>;
}
const Routing = ({ waypoints }: RoutingProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); 
    const timeout = setTimeout(() => {
      setIsLoading(false); 
    }, 1000); 
    return () => clearTimeout(timeout); 
  }, [waypoints]);

  return (
    <>
      {waypoints.length && !isLoading && (
        <RoutingMachine waypoints={waypoints} />
      )}
    </>
  );
};
export default Routing;

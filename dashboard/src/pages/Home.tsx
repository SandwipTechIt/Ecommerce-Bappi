import Chart from "../components/charts/chart";
import Widget from "../components/ui/widget";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "../api";
import Loader from "../components/shared/Loader";
import ErrorMessage from "../components/shared/ErrorMessage";
export default function Home() {

  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["staticData"],
    queryFn: () => getApi("getStaticData"),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  });
  
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage msg={error?.message} retry={refetch} />;
  return (
    <div className="home-container">
      <Chart monthlyOrders={data?.monthlyOrders} />
      <Widget totalProducts={data?.totalProducts} totalOrders={data?.totalOrders} pendingOrders={data?.pendingOrders} completedOrders={data?.completedOrders} cancelledOrders={data?.cancelledOrders} />
    </div>
  );
}

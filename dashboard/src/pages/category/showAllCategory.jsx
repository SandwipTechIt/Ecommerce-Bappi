import CategoryTable from "../../components/category/categoryTable";
import { useQuery } from "@tanstack/react-query";
import { getApi, deleteApi } from "../../api";

export default () => {

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getApi("getAllCategories"),
        keepPreviousData: true,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });

    const handelDeleteRequest = async (id) => {
        try {
            await deleteApi(`deleteCategory/${id}`)
            refetch() 
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <CategoryTable categories={data?.data} onDeleteCategory={handelDeleteRequest} />
        </div>
    );
}
/* import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { getCategories } from "@/server/categories";
import { useQuery } from "@tanstack/react-query";

const TestReactQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <Spinner className="flex items-center gap-4" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {isLoading ? (
        <Skeleton className="h-8 w-8 rounded-md" />
      ) : (
        <span>{data?.length > 0 ? data?.length : 0}</span>
      )}
    </div>
  );
};

export default TestReactQuery;
 */

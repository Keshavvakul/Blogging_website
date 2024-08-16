export const BlogSkeleton = () => {
  return (
    <>
      <div role="status" className="max-w-sm animate-pulse">
        <div className="cursor-pointer w-screen max-w-screen-md">
          <div className="flex flex-row">
            <div className="py-5">
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            </div>

            <div className="h-2 mt-5 ml-4 bg-gray-200 w-4 rounded-full"></div>

            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="text-2xl font-extrabold pt-1 pb-4 sm:pb-0">
            <div className="h-4 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
          <div className="text-xl text-gray-600 font-semibold">
            <div className="h-4 bg-gray-200 rounded-full"></div>
            <div className="text-slate-500 pt-8">
              <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <hr className="h-px mt-12 bg-slate-200 border-0 dark:bg-slate-200" />
          </div>
        </div>
      </div>
    </>
  );
};

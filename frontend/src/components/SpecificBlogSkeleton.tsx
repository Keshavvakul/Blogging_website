export const SpecificBlogSkeleton = () => {
  return (
    <>
      <div className="px-5">
        <div className="grid grid-cols-10 w-full pt-10 max-w-screen-2xl">
          <div className="col-span-8 px-32">
            <div className="max-w-sm animate-pulse">
              <div className="text-4xl font-extrabold w-full">
                <div className="h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="pt-2 text-slate-500">
                <div className="h-2 bg-gray-200 rounded-full "></div>
              </div>
              <div className="pt-2 text-lg text-slate-900 font-normal">
                <div className="h-2 bg-gray-200 rounded-full "></div>
              </div>
            </div>
            <div>
              <div className="px-20 font-bold text-slate-600">
                <div className="h-2 bg-gray-200 px-5 rounded-full mb-2.5"></div>
              </div>
              <div className="col-span-4 px-32 font-bold text-2xl">
                <div className="h-2 bg-gray-200 rounded-full "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LinkCardSkeleton = (): JSX.Element => {
  return (
    <div className="flex bg-white border border-gray-200 rounded-lg shadow no-underline animate-pulse">
      <div className="w-full p-4">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
        <div className="text-[0.78em] flex mt-2 items-center overflow-hidden whitespace-nowrap">
          <span className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></span>
        </div>
      </div>
      <svg
        className="object-cover w-48 m-0 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    </div>
  );
};

export default LinkCardSkeleton;

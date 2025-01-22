const ClassCardSkeletonl = () => {
  return (
    <div className="card card-compact bg-lightGray shadow-xl w-full animate-pulse">
      {/* Image Section */}
      <div className="relative h-56 w-full bg-gray-300 rounded-md">
        <div className="absolute bottom-2 left-3 bg-gray-400 h-6 w-32 rounded-md"></div>
      </div>

      {/* Card Body */}
      <div className="card-body !p-4">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 rounded-md mb-2"></div>

        {/* Short Description Placeholder */}
        <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-4"></div>

        {/* Price & Total Enrollment Section */}
        <div className="flex justify-between items-center my-4">
          {/* Price Placeholder */}
          <div className="h-8 w-16 bg-gray-300 rounded-md"></div>

          {/* Total Enrollment Placeholder */}
          <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
        </div>

        {/* Button Placeholder */}
        <div className="card-actions justify-end">
          <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ClassCardSkeletonl;

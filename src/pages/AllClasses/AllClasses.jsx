import { useQuery } from "@tanstack/react-query";

import ClassCard from "../../component/ClassCard/ClassCard";
import { Pagination } from "antd";

import { FaSortAmountDown } from "react-icons/fa";
import Button from "../../component/Button/Button";
import { useState } from "react";
import useAxiosPublic from "../../axios/useAxiosPublic";

// const classes = [3, 4, 3, 4, 3, 3, 3, 3, 4, 4, 3, 4, 6, 7, 7, 8];

const AllClasses = () => {
  const axios = useAxiosPublic();

  const [search, setSearch] = useState("");
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await axios.get("/users/all-classes");
      const result = res.data.data;
      console.log(result);
      return result;
    },
  });

  //   if (isLoading) {
  //     return <div className="text-center mt-20">Loading...</div>;
  //   }

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const getPageNumber = (page) => {
    console.log(page);
  };

  const handleSort = () => {
    console.log("sort");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section className="bg-offWhite">
      <div className="container mx-auto px-4 py-12">
        {/* Page Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primaryColor">
            All Classes
          </h1>
          <p className="text-muted mt-2">
            Explore all the approved classes available for enrollment.
          </p>
        </div>

        {/* search and sort action */}
        <div className="flex justify-between items-center my-10 w">
          <label className="input input-bordered  border-primaryColor my-10 flex items-center gap-2">
            <input
              onChange={handleSearch}
              value={search}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fill="#00d3c4"
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <Button onAction={handleSort} icon={FaSortAmountDown}>
            Sort by Price
          </Button>
        </div>

        {/* Class Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((classItem) => (
            <ClassCard
              key={classItem._id}
              classes={classItem}
              isLoading={isLoading}
            />
          ))}
        </div>

        <div className="mt-20">
          <Pagination
            align="center"
            showSizeChanger
            onChange={getPageNumber}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={classes.length}
            pageSizeOptions={[5, 10, 15]}
            defaultPageSize={5}
          />
        </div>
      </div>
    </section>
  );
};

export default AllClasses;

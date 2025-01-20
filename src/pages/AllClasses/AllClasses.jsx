import { useQuery } from "@tanstack/react-query";

import ClassCard from "../../component/ClassCard/ClassCard";
import { message, Pagination } from "antd";

import { FaSortAmountDown } from "react-icons/fa";
import Button from "../../component/Button/Button";
import { useState } from "react";
import useAxiosPublic from "../../axios/useAxiosPublic";
import ClassGrid from "../../component/ClassGrid/ClassGrid";

// const classes = [3, 4, 3, 4, 3, 3, 3, 3, 4, 4, 3, 4, 6, 7, 7, 8];

const AllClasses = () => {
  const axios = useAxiosPublic();

  const [search, setSearch] = useState("");
  const [displayedClasses, setDisplayedClasses] = useState([]);

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await axios.get("/users/all-classes");
      const result = res.data.data;

      return result;
    },
  });

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const getPageNumber = (page) => {
    console.log(page);
  };

  const handleSort = () => {
    console.log("sort");
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    try {
      const result = await axios.get(`/users/classes/?search=${value}`);
      const classes = result.data.data;
      setDisplayedClasses(classes);
    } catch (error) {
      message.error(error?.message || "Operation failed, Please try again!");
    }
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
        <>
          {displayedClasses.length > 0 ? (
            <ClassGrid classes={displayedClasses} isLoading={isLoading} />
          ) : (
            <ClassGrid classes={classes} isLoading={isLoading} />
          )}
        </>

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

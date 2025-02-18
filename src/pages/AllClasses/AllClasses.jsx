import { useQuery } from "@tanstack/react-query";
import { Pagination, Select } from "antd";

import { useState } from "react";
import useAxiosPublic from "../../axios/useAxiosPublic";
import ClassGrid from "../../component/ClassGrid/ClassGrid";
import Loader from "../../component/Loader/Loader";

const AllClasses = () => {
  const axios = useAxiosPublic();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClass, setTotalclass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(0);

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["approvedClasses", currentPage, pageSize, totalClass, sort],
    queryFn: async () => {
      const res = await axios.get(
        `/users/all-classes?page=${currentPage}&limit=${pageSize}&sort=${sort}`
      );
      const result = res.data.data;
      setTotalclass(res.data.totalClasses);
      setLoading(false);
      return result;
    },
  });

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSort = (value) => {
    setSort(value);
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-offWhite ">
      <div className="container mx-auto px-4 py-12">
        {/* Page Heading */}
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl font-bold text-primaryColor">
            All Classes
          </h1>
          <p className="text-muted mt-2">
            Explore all the approved classes available for enrollment.
          </p>
        </div>

        {/* Class Cards */}

        {/*  */}
        <div className="flex justify-end my-10">
          <Select
            size="large"
            placeholder="Sort"
            onChange={handleSort}
            defaultValue={"Sort"}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "0",
                label: "Sort",
              },
              {
                value: "1",
                label: "Ascending",
              },
              {
                value: "2",
                label: "Descending",
              },
            ]}
          />
        </div>

        <ClassGrid classes={classes} isLoading={isLoading} />

        <div className="mt-20">
          <Pagination
            align="center"
            current={currentPage}
            pageSize={pageSize}
            total={totalClass}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={[5, 10, 15]}
          />
        </div>
      </div>
    </section>
  );
};

export default AllClasses;

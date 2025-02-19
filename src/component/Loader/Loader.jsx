import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="min-h-screen dark:bg-darkGray flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default Loader;

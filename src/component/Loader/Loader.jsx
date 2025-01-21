import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default Loader;

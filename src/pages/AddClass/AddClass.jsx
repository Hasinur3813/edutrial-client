import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const { image } = values;
    let imageFile;

    if (image && image.length > 0) {
      imageFile = image[0].originFileObj;
    }
    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", imageFile);

    try {
      setLoading(true);
      const res = await axios.post("https://api.imgbb.com/1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const photoURL = res.data.data.url;

      const classObj = {
        ...values,
        image: photoURL,
      };

      const { data } = await axiosSecure.post("/teachers/add-class", classObj);
      const result = data.data;
      if (result.insertedId) {
        message.success("Class added successfully!");
        navigate("/dashboard/my-class");
      } else {
        message.error("An error occured, Please try again!");
      }
    } catch (error) {
      notification.error({
        title: "Error",
        message: error?.message || "Class added failed, Please try again later",
      });
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Submission failed:", errorInfo);
  };

  return (
    <div className="container mx-auto p-6 bg-lightGray dark:bg-darkGray min-h-screen">
      <h1 className="text-3xl font-bold text-primaryColor mb-6">Add a Class</h1>
      {!authLoading && (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
        >
          {/* Title Field */}
          <Form.Item
            label={
              <span className="dark:text-lightGray text-lg font-semibold">
                Class Title
              </span>
            }
            name="title"
            rules={[
              { required: true, message: "Please input the class title!" },
            ]}
          >
            <Input
              placeholder="Enter class title"
              className="py-3 dark:!bg-darkGray dark:text-lightGray dark:placeholder-white hover:border-primaryColor focus:border-primaryColor"
            />
          </Form.Item>

          {/* Name Field (Not Editable) */}
          <Form.Item
            label={
              <span className="dark:text-lightGray text-lg font-semibold">
                Name
              </span>
            }
            name="name"
            initialValue={currentUser?.displayName}
          >
            <Input
              className="py-3 dark:!bg-darkGray dark:text-lightGray dark:placeholder-white hover:border-primaryColor focus:border-primaryColor"
              readOnly
            />
          </Form.Item>

          {/* Email Field (Not Editable) */}
          <Form.Item
            label={
              <span className="dark:text-lightGray text-lg font-semibold">
                Email
              </span>
            }
            name="email"
            initialValue={currentUser?.email}
          >
            <Input
              className="py-3 dark:!bg-darkGray dark:text-lightGray dark:placeholder-white hover:border-primaryColor focus:border-primaryColor"
              readOnly
            />
          </Form.Item>

          {/* Price Field */}
          <Form.Item
            label={
              <span className="dark:text-lightGray text-lg font-semibold">
                Price
              </span>
            }
            name="price"
            rules={[
              { required: true, message: "Please input the class price!" },
              {
                type: "number",
                min: 0,
                message: "Price must be a positive number",
              },
            ]}
          >
            <InputNumber
              className="w-full dark:!bg-darkGray dark:!text-lightGray dark:!placeholder-white py-3 hover:border-primaryColor focus:border-primaryColor"
              placeholder="Enter class price"
              prefix="$"
              controls={false}
            />
          </Form.Item>

          {/* Description Field */}
          <Form.Item
            label={
              <span className="dark:text-lightGray text-lg font-semibold">
                Description
              </span>
            }
            name="description"
            rules={[
              { required: true, message: "Please provide a description!" },
            ]}
          >
            <Input.TextArea
              className="py-3 dark:!bg-darkGray dark:text-lightGray dark:placeholder-white hover:border-primaryColor focus:border-primaryColor"
              rows={4}
              placeholder="Enter class description"
            />
          </Form.Item>

          {/* Image Upload Field */}
          <Form.Item
            label={
              <span className="dark:text-lightGray text-lg font-semibold">
                Image
              </span>
            }
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              {
                required: true,
                message: "Please upload an image!",
              },
            ]}
          >
            <Upload
              name="image"
              accept="image/*"
              listType="picture"
              beforeUpload={() => false} // Prevent auto-upload
              maxCount={1}
            >
              <Button size="large" icon={<UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              size="large"
              className=" w-full bg-primaryColor "
            >
              Add Class
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AddClass;

import { useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddClass = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // Simulating a submission delay
    setTimeout(() => {
      console.log("Class Data Submitted:", values);
      setLoading(false);
      message.success("Class added successfully!");
      form.resetFields();
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Submission failed:", errorInfo);
  };

  return (
    <div className="container mx-auto p-6 bg-lightGray min-h-screen">
      <h1 className="text-3xl font-bold text-primaryColor mb-6">Add a Class</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
      >
        {/* Title Field */}
        <Form.Item
          label={<span className="text-lg font-semibold">Class Title</span>}
          name="title"
          rules={[{ required: true, message: "Please input the class title!" }]}
        >
          <Input
            placeholder="Enter class title"
            className="py-3 hover:border-primaryColor focus:border-primaryColor"
          />
        </Form.Item>

        {/* Name Field (Not Editable) */}
        <Form.Item
          label={<span className="text-lg font-semibold">Name</span>}
          name="name"
          initialValue="John Doe"
        >
          <Input
            className="py-3 hover:border-primaryColor focus:border-primaryColor"
            readOnly
          />
        </Form.Item>

        {/* Email Field (Not Editable) */}
        <Form.Item
          label={<span className="text-lg font-semibold">Email</span>}
          name="email"
          initialValue="johndoe@example.com"
        >
          <Input
            className="py-3 hover:border-primaryColor focus:border-primaryColor"
            readOnly
          />
        </Form.Item>

        {/* Price Field */}
        <Form.Item
          label={<span className="text-lg font-semibold">Price</span>}
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
            className="w-full py-3 hover:border-primaryColor focus:border-primaryColor"
            placeholder="Enter class price"
            prefix="$"
            controls={false}
          />
        </Form.Item>

        {/* Description Field */}
        <Form.Item
          label={<span className="text-lg font-semibold">Description</span>}
          name="description"
          rules={[{ required: true, message: "Please provide a description!" }]}
        >
          <Input.TextArea
            className="py-3 hover:border-primaryColor focus:border-primaryColor"
            rows={4}
            placeholder="Enter class description"
          />
        </Form.Item>

        {/* Image Upload Field */}
        <Form.Item
          label={<span className="text-lg font-semibold">Image</span>}
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
            size="large"
            className=" w-full bg-primaryColor "
          >
            Add Class
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddClass;

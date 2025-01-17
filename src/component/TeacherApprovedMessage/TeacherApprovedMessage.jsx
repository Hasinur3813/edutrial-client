import { CheckCircleOutlined } from "@ant-design/icons";
import { Alert, Card, Typography } from "antd";

const TeacherApprovedMessage = () => {
  return (
    <Card className="mt-5 rounded-lg bg-[#f6ffed] border border-[#d9f7be]">
      <Alert
        message={
          <Typography.Title level={4} style={{ margin: 0, color: "#389e0d" }}>
            <CheckCircleOutlined style={{ marginRight: 8 }} />
            Congratulations!
          </Typography.Title>
        }
        description={
          <Typography.Text>
            Your request for becoming a teacher has been approved. You can now
            create classes for your students.
          </Typography.Text>
        }
        type="success"
      />
    </Card>
  );
};

export default TeacherApprovedMessage;

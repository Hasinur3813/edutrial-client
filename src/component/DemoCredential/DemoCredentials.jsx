const DemoCredentials = ({ handleCredentials, credentials }) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div>
        <p className="font-semibold text-lg mt-3 text-primaryColor">
          Demo Credentials
        </p>
        <div className="flex gap-2 mt-2" onClick={handleCredentials}>
          <button
            name="user"
            className="font-semibold bg-primaryColor px-3 py-2 text-lightGray rounded-md"
            type="button"
          >
            User
          </button>
          <button
            name="teacher"
            className="font-semibold bg-primaryColor px-3 py-2 text-lightGray rounded-md"
            type="button"
          >
            Teacher
          </button>
          <button
            name="admin"
            className="font-semibold bg-primaryColor px-3 py-2 text-lightGray rounded-md"
            type="button"
          >
            Admin
          </button>
        </div>
      </div>
      {credentials?.email && (
        <div className="border border-dashed p-4 rounded-md dark:text-lightGray">
          <p>
            <strong>Email:</strong>{" "}
            <code className="text-base tracking-leading-relaxed">
              {credentials?.email}
            </code>
          </p>
          <p>
            <strong>Password: </strong>{" "}
            <code className="text-base tracking-leading-relaxed">
              {credentials?.password}
            </code>
          </p>
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;

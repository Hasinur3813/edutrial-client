import ClassCard from "../ClassCard/ClassCard";

const ClassGrid = ({ classes, isLoading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {classes.map((classItem) => (
        <ClassCard
          key={classItem._id}
          classes={classItem}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default ClassGrid;

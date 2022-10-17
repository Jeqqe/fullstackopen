import { CoursePart } from "../App"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
      case "normal":
        return (
          <div>
            <h2>
              Name: {part.name}
            </h2>
            <p>
              description: {part.description}
            </p>
            <p>
              exercise count: {part.exerciseCount}
            </p>
          </div>
        )
      case "groupProject":
        return (
          <div>
            <h2>
              Name: {part.name}
            </h2>
            <p>
              exercise count: {part.exerciseCount}
            </p>
            <p>
              group project count: {part.groupProjectCount}
            </p>
          </div>
        )
      case "submission":
        return (
          <div>
            <h2>
              Name: {part.name}
            </h2>
            <p>
              exercise count: {part.exerciseCount}
            </p>
            <p>
              submission link: {part.exerciseSubmissionLink}
            </p>
          </div>
        )
      case "special":
        return (
          <div>
            <h2>
              Name: {part.name}
            </h2>
            <p>
              exercise count: {part.exerciseCount}
            </p>
            <p>
              requirements: {part.requirements}
            </p>
          </div>
        )
      default:
        return assertNever(part);
    }
}

export default Part

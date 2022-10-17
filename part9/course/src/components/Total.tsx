import { CoursePart } from "../App"

const Total = ({ parts }: { parts: CoursePart[] }) => {

  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )

}

export default Total

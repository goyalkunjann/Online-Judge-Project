
import { NavLink } from "react-router-dom";

const ProblemPageUI = () => {
  // Placeholder problem data
  const problem = {
    name: "Example Problem",
    difficulty: "Hard",
    tag: "Algorithms",
    statement: "This is a sample problem statement explaining the problem.",
    constraints: "1 ≤ n ≤ 10^5\n1 ≤ arr[i] ≤ 10^9",
    sinput: "10\n1 2 3 4 5 6 7 8 9 10",
    soutput: "55",
  };

  // Convert newline characters to paragraph breaks for display
  const formatText = (text) => text.split('\n').map((line, i) => <p key={i}>{line}</p>);

  return (
    <div className="min-h-screen bg-gray-800 text-white p-5">
      <NavLink to="/" className="text-blue-400 hover:text-blue-600 mb-4 inline-block">← Back to problems</NavLink>
      <div className="mt-5">
        <h1 className="text-3xl font-bold mb-3">{problem.name}</h1>
        <h2 className="text-xl font-semibold">Problem Statement</h2>
        <div className="bg-gray-700 p-4 rounded mt-2">
          {formatText(problem.statement)}
        </div>
        <h2 className="text-xl font-semibold mt-4">Constraints</h2>
        <div className="bg-gray-700 p-4 rounded mt-2">
          {formatText(problem.constraints)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h2 className="text-xl font-semibold">Sample Input</h2>
            <div className="bg-gray-700 p-4 rounded">
              <pre>{problem.sinput}</pre>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Sample Output</h2>
            <div className="bg-gray-700 p-4 rounded">
              <pre>{problem.soutput}</pre>
            </div>
          </div>
        </div>
        {/* Include additional sections as needed */}
      </div>
    </div>
  );
};

export default ProblemPageUI;

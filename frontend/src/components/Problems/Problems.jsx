
import { Link } from 'react-router-dom'; // For navigation within the table
import Topbar from '../Topbar/Topbar'; // Corrected path assuming Problems.jsx is in the components folder

const Problems = () => {
  // Dummy data to simulate fetched problems
  const problems = [
    { id: 1, title: 'Problem 1', difficulty: 'Easy', category: 'Math', videoId: null },
    { id: 2, title: 'Problem 2', difficulty: 'Medium', category: 'Logic', videoId: 'dQw4w9WgXcQ' },
    // Add more problems as needed
  ];

  return (
    <div className="min-h-screen bg-gray-800">
      <Topbar /> {/* Include the Topbar at the top */}
      <div className="flex justify-center items-center">
        <div className="max-w-4xl w-full bg-gray-700 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium text-white mb-4">Problems</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-white border-b border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Difficulty</th>
                  <th className="px-6 py-3 text-left">Category</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {problems.map((problem, idx) => (
                  <tr className={`${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}`} key={problem.id}>
                    <td className="px-6 py-4">{problem.id}</td>
                    <td className="px-6 py-4">
                      <Link to={`/problems/${problem.id}`} className="text-blue-400 hover:text-blue-300">
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{problem.difficulty}</td>
                    <td className="px-6 py-4">{problem.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;

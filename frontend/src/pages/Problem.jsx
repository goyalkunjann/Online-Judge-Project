
import { NavLink } from "react-router-dom";

const ProblemsUI = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mt-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-700 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Topic Tag
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Difficulty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {/* Example row */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <NavLink to="/problems/1" className="text-blue-400 hover:text-blue-600">
                          Problem 1
                        </NavLink>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Algorithms
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                        Hard
                      </td>
                    </tr>
                    {/* Repeat rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsUI;

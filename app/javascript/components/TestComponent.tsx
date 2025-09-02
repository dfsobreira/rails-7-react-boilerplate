import React, { useEffect, useState } from "react";

interface TestItem {
  id: number;
  name: string;
  status: string;
}

interface TestComponentProps {
  title: string;
  items: TestItem[];
}

const TestComponent: React.FC<TestComponentProps> = ({
  title = "Testing React, Stimulus & Tailwind",
  items = [],
}) => {
  const [selectedItem, setSelectedItem] = useState<TestItem | null>(null);

  const handleItemClick = (item: TestItem) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    console.log("TestComponent mounted with props:", { title, items });
  }, [title, items]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items List */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Test Items
          </h2>
          {items && items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedItem?.id === item.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "active"
                        ? "bg-green-100 text-green-800"
                        : item.status === "ready"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 text-center">No items to display</p>
            </div>
          )}
        </div>

        {/* Selected Item Details */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Selected Item
          </h2>
          {selectedItem ? (
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {selectedItem.name}
              </h3>
              <p className="text-gray-600 mb-4">ID: {selectedItem.id}</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedItem.status === "active"
                      ? "bg-green-100 text-green-800"
                      : selectedItem.status === "ready"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedItem.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 text-center">
                Click on an item to see details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Counter */}
      <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Interactive Counter (React State)
        </h3>
        <Counter />
      </div>
    </div>
  );
};

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setCount(count - 1)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
      >
        -
      </button>
      <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">
        {count}
      </span>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
      >
        +
      </button>
    </div>
  );
};

export default TestComponent;

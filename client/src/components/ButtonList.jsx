export const ButtonList = ({ categories, filterCategory }) => {
  return (
    <div className="flex flex-wrap justify-center my-6 gap-4">
      {categories.map((category) => (
        <button
          type="button"
          className="px-6 py-2 bg-gray-800 text-orange-400 font-semibold rounded-full shadow-lg hover:bg-orange-400 hover:text-white transition-all duration-300 ease-in-out"
          onClick={() => filterCategory(category)}
          key={category}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

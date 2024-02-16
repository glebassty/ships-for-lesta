interface SelectsProps {
  handleFilterChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    filterKey: string
  ) => void;
  filter: {
    level: string;
    nation: string;
    type: string;
  };
  uniqueLevels: any[];
  uniqueNations: any[];
  uniqueTypes: any[];
}

const Selects: React.FC<SelectsProps> = ({
  handleFilterChange,
  filter,
  uniqueLevels,
  uniqueNations,
  uniqueTypes,
}) => {
  return (
    <div className="flex space-x-4 mb-4">
      <div>
        <label htmlFor="level" className="block text-blue-200">
          Уровень:
        </label>
        <select
          id="level"
          name="level"
          value={filter.level}
          onChange={(e) => handleFilterChange(e, "level")}
          className="border-gray-300 border rounded-md px-4 py-2 w-40 bg-white text-blue-900"
        >
          <option value="">Все</option>
          {uniqueLevels.map((level: string) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="nation" className="block text-blue-200">
          Нация:
        </label>
        <select
          id="nation"
          name="nation"
          value={filter.nation}
          onChange={(e) => handleFilterChange(e, "nation")}
          className="border-gray-300 border rounded-md px-4 py-2 w-40 bg-white text-blue-900"
        >
          <option value="">Все</option>
          {uniqueNations.map((nation: string) => (
            <option key={nation} value={nation}>
              {nation}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="type" className="block text-blue-200">
          Класс:
        </label>
        <select
          id="type"
          name="type"
          value={filter.type}
          onChange={(e) => handleFilterChange(e, "type")}
          className="border-gray-300 border rounded-md px-4 py-2 w-40 bg-white text-blue-900"
        >
          <option value="">Все</option>
          {uniqueTypes.map((type: string) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Selects;

export default function CheckboxDiv({ value, required }) {
  return (
    <div className="flex items-center ">
      <div className="flex items-center ">
        <input
          id="terms"
          type="checkbox"
          value=""
          required={required}
          className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
        />
      </div>
      <label
        htmlFor="terms"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {value}
      </label>
    </div>
  );
}

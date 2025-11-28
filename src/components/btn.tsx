interface props {
  value: string;
  btnType: "submit" | "reset" | "button" | undefined;
  disabledStatue: boolean;
}
export default function Btn({ value, btnType, disabledStatue = false }: props) {
  return (
    <button
      type={btnType}
      disabled={disabledStatue}
      className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 dark:text-gray-800 cursor-pointer"
    >
      {disabledStatue ? "loading" : value}
    </button>
  );
}

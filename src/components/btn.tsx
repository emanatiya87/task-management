interface props {
  value: string;
  btnType: "submit" | "reset" | "button" | undefined;
  disabledStatue: boolean;
}
export default function Btn({ value, btnType, disabledStatue }: props) {
  return (
    <button
      type={btnType}
      disabled={disabledStatue}
      className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
    focus:outline-none focus:ring-4 focus:ring-gray-300
    ${
      disabledStatue
        ? "bg-gray-400 text-gray-200 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
        : "bg-gray-800 text-white hover:bg-gray-900 cursor-pointer dark:bg-gray-200 dark:hover:bg-gray-400 dark:text-gray-800"
    }`}
    >
      {value}
    </button>
  );
}

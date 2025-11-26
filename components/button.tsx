interface Props {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: Props) {
  const isOperator = ["+", "-", "×", "÷", "="].includes(label);
  const color = isOperator ? "bg-teal-500" : "bg-gray-600";

  return (
    <button
      onClick={onClick}
      className={`${color} rounded-xl p-3 text-2xl font-semibold hover:opacity-90`}
    >
      {label}
    </button>
  );
}

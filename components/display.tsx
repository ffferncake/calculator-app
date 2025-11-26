interface Props {
  input: string;
  result: string;
}

export default function Display({ input, result }: Props) {
  return (
    <div className="bg-gray-700 rounded-xl p-3 mb-3 text-right">
      <div className="text-gray-300 text-xl">{input || "0"}</div>
      <div className="text-white text-2xl font-bold">{result}</div>
    </div>
  );
}

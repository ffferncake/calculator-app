import { useState } from "react";
import { calculateExpression } from "../lib/calculate-expression";

/**
 * 🧮 useCalculator Hook
 * - 계산기의 상태(입력 중인 수식, 결과)를 관리
 * - 숫자 / 연산자 / 소수점 / 삭제 / 전체 초기화 / 계산 기능을 담당
 */
export function useCalculator() {
  const [input, setInput] = useState(""); //현재 입력 중인 수식 (예: "12+3×5")
  const [result, setResult] = useState(""); //계산 결과 (예: "27")

  const handleInput = (value: string) => {
    // ✅ 1. 결과가 이미 있고, 다음 입력이 "연산자"일 경우:
    // → 이전 결과값을 새로운 수식의 시작점으로 사용 (연속 계산 허용)
    //    예: "2+3=" 후 "+4=" 입력 시 → "5+4"
    if (result && /[\+\-\*\/×÷]/.test(value)) {
      setInput(result + value);
      setResult("");
      return;
    }

    // ✅ 2. 결과가 이미 있고, 다음 입력이 "숫자"일 경우:
    // → 새로운 계산을 시작 (기존 결과 초기화)
    //    예: "2+3=" 후 "7" 입력 시 → "7"
    if (result && /[0-9.]/.test(value)) {
      setInput(value);
      setResult("");
      return;
    }

    // 🚫 3. 마지막 입력이 연산자일 때 또 다른 연산자를 입력하면 무시
    //    예: "3+" 다음에 "-" 입력 → 무시 (연속 연산자 방지)
    if (/[\+\-×÷]$/.test(input) && /[\+\-×÷]/.test(value)) return;

    // 🚫 4. 하나의 숫자에 소수점(.)을 두 번 이상 입력하는 것을 방지
    //    예: "3.1." → 허용하지 않음
    const lastNum = input.split(/[\+\-×÷]/).pop();
    if (value === "." && lastNum?.includes(".")) return;

    // ✅ 5. 모든 조건을 통과하면 입력을 추가
    setInput((prev) => prev + value);
  };

  /**
   * - 마지막 입력값만 삭제 (Backspace 기능)
   * - 예: "12+3" → "12+"
   */
  const handleClear = () => setInput((prev) => prev.slice(0, -1));

  /**
   * - 전체 초기화 (입력 + 결과 모두 삭제)
   * - "AC" 버튼에 연결
   */
  const handleAllClear = () => {
    setInput("");
    setResult("");
  };

   /**
   * - 현재 수식을 실제로 계산하고 결과를 표시
   * - 오류 발생 시(잘못된 입력, 0으로 나누기 등) "Error" 표시
   */
  const handleCalculate = () => {
    try {
      const res = calculateExpression(input);
      setResult(res);
    } catch {
      setResult("Error");
    }
  };

  return {
    input,
    result,
    handleInput,
    handleClear,
    handleAllClear,
    handleCalculate,
  };
}

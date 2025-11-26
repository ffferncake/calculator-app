/**
 * 사용자가 입력한 수식 문자열(expr)을 직접 계산하여 결과를 문자열로 반환하는 함수
 * eval() 없이 사칙연산(+ - × ÷) 우선순위를 고려하여 계산함
 */
export function calculateExpression(expr: string): string {
  // 입력이 비어 있으면 빈 문자열 반환
  if (!expr) return "";

  // UI에서 사용하는 ×, ÷ 기호를 실제 연산자 * / 로 변환
  expr = expr.replace(/×/g, "*").replace(/÷/g, "/");

  // 숫자 또는 연산자(+ - * /)를 기준으로 토큰화 (예: "12+3*4" → ["12", "+", "3", "*", "4"])
  const tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
  if (!tokens) throw new Error("Invalid expression"); // 토큰이 없으면 에러

  // 숫자 스택 (피연산자들을 저장)
  const values: number[] = [];

  // 연산자 스택 (+ - * / 저장)
  const ops: string[] = [];

  // 연산자 우선순위 정의 (*, / 우선)
  const precedence: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2 };

  /**
   * 스택의 맨 위 두 숫자(a, b)와 연산자(op)를 꺼내 계산 후, 결과를 다시 values에 푸시
   */
  const applyOp = () => {
    const b = values.pop()!; // 오른쪽 피연산자
    const a = values.pop()!; // 왼쪽 피연산자
    const op = ops.pop()!; // 연산자

    console.log("🧩 applyOp called:");
    console.log("➤ a:", a, "b:", b, "op:", op);
    console.log("➤ values before:", [...values]);

    let res = 0;

    if (op === "+") res = a + b;
    else if (op === "-") res = a - b;
    else if (op === "*") res = a * b;
    else if (op === "/") {
      if (b === 0) throw new Error("Divide by zero"); // 0으로 나누면 에러
      res = a / b;
    }
    console.log("➤ result:", res);

    values.push(res); // 계산 결과를 다시 values 스택에 넣음

    console.log("➤ values after push:", [...values]);
    console.log("-----------------------------");
  };

  /**
   * 토큰 순회
   * - 숫자는 values 스택에 저장
   * - 연산자는 ops 스택에 저장 (단, 우선순위 고려해서 기존 연산자 처리)
   */
  for (const token of tokens) {
    console.log("🔹 Token:", token);
    console.log("   ➤ current values:", [...values]);
    console.log("   ➤ current ops:", [...ops]);

    if (!isNaN(Number(token))) {
      // 숫자인 경우 values에 추가
      values.push(Number(token));
      console.log("➤ push number:", token);
    } else if (["+", "-", "*", "/"].includes(token)) {
      // 연산자인 경우: 스택에 있는 연산자의 우선순위가 같거나 높으면 먼저 계산
      while (
        ops.length &&
        precedence[ops[ops.length - 1]] >= precedence[token]
      ) {
        console.log("⚙️ applying previous op first:", ops[ops.length - 1]);
        applyOp();
      }
      // 새 연산자 추가
      ops.push(token);
    } else {
      throw new Error("Invalid token"); // 예외적인 입력은 에러 처리
    }
  }

  // 모든 토큰을 처리한 후 남은 연산자들을 순서대로 적용
  while (ops.length) applyOp();

  // 계산 결과를 소수점 6자리까지 고정 후 문자열로 반환
  return String(Number(values[0].toFixed(6)));
}

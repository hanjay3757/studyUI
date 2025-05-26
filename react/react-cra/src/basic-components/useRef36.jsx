import { useRef } from "react";

export default function UseRef36() {
  let ref = useRef(0);

  function handlePlus() {
    ref.current = ref.current + 1;
    console.log(ref.current);
    // 실제 데이터가 늘거나 하면 useState
  }

  return (
    <div>
      <button>
        <p>{ref.current}</p>
      </button>
    </div>
  );
}

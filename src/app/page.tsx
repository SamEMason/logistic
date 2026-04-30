'use client';

import { useCounterStore } from '@/store';

export default function Home() {
  return <OtherComponent />;
}

function OtherComponent() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div className="flex items-center justify-center gap-4 h-screen">
      <div className="flex items-center justify-center gap-4 h-32">
        <button
          onClick={() => decrement()}
          className="h-full w-32 px-4 rounded-tr-2xl rounded-bl-2xl text-4xl bg-amber-900 cursor-pointer"
        >
          -
        </button>
        <span className="flex items-center justify-center h-full w-32 rounded-t-2xl text-2xl bg-amber-950">
          {count}
        </span>
        <button
          onClick={() => increment()}
          className="h-full w-32 px-4 rounded-tl-2xl rounded-br-2xl text-4xl bg-amber-600 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}

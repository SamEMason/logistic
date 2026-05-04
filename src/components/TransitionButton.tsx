interface TransitionButtonPropsType {
  children: React.ReactNode;
  transition: () => void;
}

export default function TransitionButton({
  children,
  transition,
}: TransitionButtonPropsType) {
  return (
    <button
      onClick={transition}
      className="fl-text-base/4xl drop-shadow-sm h-32 bg-amber-700 active:bg-amber-500 hover:cursor-pointer"
    >
      {children}
    </button>
  );
}

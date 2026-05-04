interface BlockContainerPropsType {
  children: React.ReactNode;
}

export default function BlockContainer({ children }: BlockContainerPropsType) {
  return <div className="flex flex-col fl-gap-4/16 flex-1 h-full">{children}</div>;
}

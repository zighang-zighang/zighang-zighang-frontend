export function RegionButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  const getButtonClasses = () => {
    const baseClasses = "w-48 px-3.5 py-1.5 text-sm font-large text-left";
    return active
      ? `${baseClasses} bg-purple-100 text-purple-900`
      : `${baseClasses} bg-white text-black`;
  };
  return (
    <button onClick={onClick} className={getButtonClasses()}>
      {label}
    </button>
  );
}

import { ReactNode } from "react";

interface Props {
  className?: string;
  titleSection?: string;
  children: ReactNode;
}

export const SectionFormProducts = ({
  className,
  titleSection,
  children,
}: Props) => {
  return (
    <div
      className={`bg-white border border-gray-300 shadow-sm rounded-md flex flex-col gap-4 p-7 h-fit ${className}`}
    >
      {titleSection && (
        //si contiene algun valor
        <h2 className="font-bold tracking-tight text-xl">{titleSection}:</h2>
      )}
      {children}
    </div>
  );
};

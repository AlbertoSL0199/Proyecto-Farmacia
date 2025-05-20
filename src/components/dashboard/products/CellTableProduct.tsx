interface Props {
    contenido: string,
}

export const CellTableProduct = ({contenido}: Props) => {
  return <td className="p-4 font-medium tracking-tighter">{contenido}</td>;
};

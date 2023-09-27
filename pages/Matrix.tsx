import { ReactNode } from 'react';
import { Index } from './Index';
import { createSeries } from './createSeries';

type Props<TSize, TIndex> = {
  size: TSize;
  content?: (r: TIndex, c: TIndex) => ReactNode;
  style: string;
  onClick?: (r: TIndex, c: TIndex) => void;
  cellStyle?: (r: TIndex, c: TIndex) => string;
};

export const Matrix = <TSize extends number, TIndex = Index<TSize>>(
  props: Props<TSize, TIndex>
) => {
  const indices = createSeries(props.size, (i) => i) as TIndex[];

  return (
    <table className={props.style}>
      <tbody>
        {indices.map((r) => (
          <tr key={r as number}>
            {indices.map((c) => (
              <td
                className={props.cellStyle ? props.cellStyle(r, c) : ''}
                onClick={props.onClick ? () => props.onClick(r, c) : () => {}}
                key={c as number}
              >
                {props.content ? props.content(r, c) : <></>}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

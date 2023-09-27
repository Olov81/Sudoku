import '../styles/globals.css';

import { Highlight, Sudoku } from './Sudoku';
import { Cell, Value, createMatrix } from './sudokuboard';

const selectAll = (values: Value[]): Highlight[] => {
  return createMatrix((row, col) => ({
    cell: { row, col } as Cell,
    getAccent: (v: Value) =>
      values.some((x) => x === v) ? 'Selected' : 'None',
  })).flatMap((x) => x);
};

function MyApp() {
  return <Sudoku highlights={[...selectAll([9, 4])]} />;
}

export default MyApp;

import { Index } from './Index';
import { createSeries } from './createSeries';

export const values = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type Value = typeof values[number];
export type CellIndex = Index<9>;
export type Cell = { row: CellIndex; col: CellIndex };
export type Accent = 'None' | 'Selected' | 'Remove' | 'Keep';
export type Candidate = { value: Value; accent?: Accent };

export const createMatrix = <T>(createCell: (row, col) => T): T[][] => {
  return createSeries(9, (row) =>
    createSeries(9, (col) => createCell(row, col))
  );
};

export class SudokuBoard {
  board: Set<Candidate>[][] = createMatrix(
    (row, col) => new Set<Candidate>(values.map((v) => ({ value: v })))
  );

  public getCandidates(cell: Cell) {
    return this.board[cell.row][cell.col];
  }

  public getRow(row: CellIndex) {
    return this.board[row].map((candidates, col) => ({
      cell: { row, col: col as CellIndex },
      candidates,
    }));
  }

  public set(cell: Cell, candidate: Candidate) {
    const candidates = this.board[cell.row][cell.col];
    candidates.clear();
    candidates.add(candidate);
    this.board[cell.row][cell.col] = candidates;
  }

  public reset(cell: Cell) {
    const candidates = this.board[cell.row][cell.col];
    candidates.clear();
    values.forEach((v) => candidates.add({ value: v }));
    this.board[cell.row][cell.col] = candidates;
  }
}

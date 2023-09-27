import { useState } from 'react';
import {
  Accent,
  Candidate,
  Cell,
  CellIndex,
  SudokuBoard,
  Value,
  values,
} from './sudokuboard';
import { Matrix } from './Matrix';

export type Highlight = { cell: Cell; getAccent: (value: Value) => Accent };

export const Sudoku = (props: { highlights: Highlight[] }) => {
  const [game, setGame] = useState({ board: new SudokuBoard() });
  const [selectedCell, setSelectedCell] = useState<Cell>({ row: 0, col: 0 });

  const areEqual = (c1: Cell, c2: Cell) =>
    c1.row === c2.row && c1.col === c2.col;

  const createCandidates = (cell: Cell) => {
    const candidates = game.board.getCandidates(cell);

    const getCandidate = (value: Value): Candidate | undefined => {
      return Array.from(candidates.values()).find((v) => v.value == value);
    };

    const getCandidateStyle = (candidate: Candidate | undefined) => {
      const cellHighlights = props.highlights.find((x) =>
        areEqual(x.cell, cell)
      );

      if (!cellHighlights) {
        return '';
      }

      const accent = cellHighlights.getAccent(candidate.value);

      switch (accent) {
        case 'Selected':
          return 'selected-candidate';
        case 'Remove':
          return '';
        case 'Keep':
          return '';
        default:
          return '';
      }
    };

    if (candidates.size > 1) {
      return (
        <Matrix
          size={3}
          content={(r, c) => {
            const value = (r * 3 + c + 1) as Value;
            const candidate = getCandidate(value);
            return (
              <div className={getCandidateStyle(candidate)}>
                {candidate ? candidate.value : ''}
              </div>
            );
          }}
          style="candidates"
        />
      );
    }

    return <div>{candidates.values().next().value.value}</div>;
  };

  const createCell = (cell: Cell) => {
    return (
      <div
        className={areEqual(cell, selectedCell) ? 'hightlightedCell' : 'cell'}
        onClick={() => setSelectedCell(cell)}
      >
        {createCandidates(cell)}
      </div>
    );
  };

  const updateSelectedCell = (r: number, c: number) => {
    const toIndex = (v: number) => Math.max(0, Math.min(v, 8)) as CellIndex;
    setSelectedCell({ row: toIndex(r), col: toIndex(c) });
  };

  const onKeyDown = (keyCode: string) => {
    if (keyCode == 'ArrowDown') {
      updateSelectedCell(selectedCell.row + 1, selectedCell.col);
    } else if (keyCode == 'ArrowUp') {
      updateSelectedCell(selectedCell.row - 1, selectedCell.col);
    } else if (keyCode == 'ArrowRight') {
      updateSelectedCell(selectedCell.row, selectedCell.col + 1);
    } else if (keyCode == 'ArrowLeft') {
      updateSelectedCell(selectedCell.row, selectedCell.col - 1);
    } else if (keyCode == 'Delete') {
      game.board.reset(selectedCell);
      setGame({ ...game });
    } else {
      const value = values.find((v) => keyCode.endsWith(v.toString()));
      if (!value) {
        return;
      }
      game.board.set(selectedCell, { value: value });
      setGame({ ...game });
    }
  };

  return (
    <div
      style={{ outline: 'none' }}
      tabIndex={0}
      onKeyDown={(x) => onKeyDown(x.code)}
    >
      <Matrix
        size={9}
        content={(row, col) => createCell({ row, col })}
        style="sudokuboard"
      />
      <Matrix size={3} style="sudokugroups" />
    </div>
  );
};

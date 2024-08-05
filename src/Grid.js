import { Button, Box, SimpleGrid } from "@chakra-ui/react";

export default function Grid({ size }) {
    let mineCount = 0;
    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const createGrid = () => Array.from({ length: size }, () => Array(size).fill(0));
    const grid = createGrid();

    while (mineCount < size) {
        let row = getRandomInt(size);
        let column = getRandomInt(size);
        if (grid[row][column] === 0) {
            grid[row][column] = 1;
            mineCount++;
        }
    }

    const countAdjacentMines = (grid, row, col) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Skip the current cell
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                    if (grid[newRow][newCol] === 1) {
                        count++;
                    }
                }
            }
        }
        return count;
    };

    const handleClick = (row, col, adjacentMines = 0, isMine = false) => {
        if (adjacentMines === 0) {
            // Handle revealing empty cells here
        }

        console.log(`Row: ${row}, Col: ${col}, Adjacent Mines: ${adjacentMines}, Is Mine: ${isMine}`);
    };

    return (
        <Box maxW="75%" maxH="75%" paddingY="5em" margin="0 auto">
            <SimpleGrid columns={size} spacing={1}>
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) =>
                        cell === 1 ? (
                            <Button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleClick(rowIndex, colIndex, countAdjacentMines(grid, rowIndex, colIndex), true)}
                            >Mine</Button>
                        ) : (
                            <Button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleClick(rowIndex, colIndex, countAdjacentMines(grid, rowIndex, colIndex))}
                            >
                                {countAdjacentMines(grid, rowIndex, colIndex)}
                            </Button>
                        )
                    )
                )}
            </SimpleGrid>
        </Box>
    );
}

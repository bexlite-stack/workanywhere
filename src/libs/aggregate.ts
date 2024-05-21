type ColumnType = "TEXT" | "NUMBER" | "DATE"; // Extend as necessary

interface Data {
  columns: string[];
  columnTypes: ColumnType[];
  rows: any[][];
  rowsAffected: number;
  lastInsertRowid: string | null;
}

export function aggregate(data: Data): Record<string, any>[] {
  if (data.rows.length === 0) {
    return [];
  }

  const aggregatedRows = data.rows.map((row) => {
    const aggregatedRow: Record<string, any> = {};
    data.columns.forEach((col, index) => {
      aggregatedRow[col] = row[index];
    });
    return aggregatedRow;
  });

  return aggregatedRows;
}

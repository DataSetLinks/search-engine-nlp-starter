"use client";

import { queryAPI } from "@/api/query";
import { useRef, useMemo, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { generateColumnsBasedOnData } from "@/app/utils";
import { Footer } from "@/components/footer";
import { SearchForm } from "@/components/search-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import clsx from "clsx";

export default function SearchPage() {
  const [searchedFor, setSearchedFor] = useState("");
  const [results, setResults] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedRows, setExpandedRows] = useState<Record<number, Record<string, boolean>>>({});

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError("");
    setSearchedFor(searchQuery);

    try {
      const response: Record<string, string>[] = await queryAPI(searchQuery);
      setResults(response);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExpand = (rowIdx: number, column: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIdx]: {
        ...prev[rowIdx],
        [column]: !prev[rowIdx]?.[column],
      },
    }));
  };

  const columns = useMemo(() => generateColumnsBasedOnData(results), [results]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const renderVirtualRow = (virtualRow: any) => (
    <TableRow key={virtualRow.index}>
      {columns.map((column, colIdx) => {
        const cellValue = String(results[virtualRow.index]?.[column] || "");
        const className = clsx("min-w-[200px] ", {
          "break-word": cellValue.includes(" "),
          "break-all": !cellValue.includes(" ") || cellValue.startsWith("http"),
        });

        if (Array.isArray(cellValue)) {
          const isExpanded = expandedRows[virtualRow.index]?.[column];
          const displayItems = isExpanded ? cellValue : cellValue.slice(0, 10);
          const displayText = (displayItems as unknown as string[]).join(", ");

          return (
            <TableCell key={`${colIdx}_${column}`} className={className}>
              <span className="text-xs">{displayText}</span>
              {cellValue.length > 10 && (
                <button
                  title={displayText}
                  className="ml-2 text-blue-600 underline text-xs"
                  onClick={() => handleExpand(virtualRow.index, column)}
                  type="button"
                >
                  {isExpanded ? "Collapse" : "Expand"}
                </button>
              )}
            </TableCell>
          );
        }

        return (
          <TableCell key={`${colIdx}_${column}`} className={className}>
            {cellValue}
          </TableCell>
        );
      })}
    </TableRow>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto py-10 px-4 max-w-7xl flex-grow">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">DataLinks Search API</CardTitle>
            <CardDescription>Enter your search query to fetch data from the DataLinks</CardDescription>
          </CardHeader>
          <CardContent>
            <SearchForm handleSearch={handleSearch} loading={loading} />
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {results && results.length > 0 ? (
              <div ref={parentRef} className="rounded-md border overflow-auto" style={{ maxHeight: 1014 }}>
                <Table className="table-auto w-full">
                  <TableHeader>
                    <TableRow className="sticky top-0 z-10 bg-gray-100 font-bold text-gray-800">
                      {columns.map((column, index) => (
                        <TableHead key={`${index}_${column}`} className=" bg-gray-100 font-bold text-gray-800">
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {virtualRows.length > 0 && <tr key="top-spacer" style={{ height: `${virtualRows[0].start}px` }} />}

                    {virtualRows.map(renderVirtualRow)}

                    {virtualRows.length > 0 && (
                      <tr
                        key="bottom-spacer"
                        style={{
                          height: `${rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end}px`,
                        }}
                      />
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              !loading &&
              searchedFor && (
                <div className="text-center text-muted-foreground">No results found. Try a different search term.</div>
              )
            )}

            {!searchedFor && !loading && results.length === 0 && (
              <div className="text-center text-muted-foreground">
                Enter a search term and click Search to see results.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

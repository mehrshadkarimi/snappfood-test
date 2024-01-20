"use client";
import debounce from "@/helpers/debounce";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

type TVirtualizedListProps<T> = {
  items: T[]; // Array of items to be displayed in the virtualized list
  itemHeight: number; // Height of each item in the list
  renderRow: (item: T, index: number) => React.ReactNode; // Function to render each row in the list
  isFetchingNextPage: boolean; // Flag indicating whether the next page is being fetched
  onScrollEnd: () => void; // Callback function triggered when scrolling reaches the end
  indexKey: keyof T; // Key to uniquely identify each item in the list
};

const VirtualizedList = <T,>({
  items,
  itemHeight,
  renderRow,
  isFetchingNextPage,
  onScrollEnd,
  indexKey,
}: TVirtualizedListProps<T>) => {
  // Create a reference to the container div
  const containerRef = useRef<HTMLDivElement | null>(null);
  // State to track the visible items in the list
  const [visibleItems, setVisibleItems] = useState<T[]>([]);

  // Debounced function to update the visible items
  const updateVisibleItems = debounce(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight;

    // Trigger onScrollEnd callback when scrolling reaches the end
    if (isBottom && !isFetchingNextPage) {
      onScrollEnd?.();
    }

    // Calculate the start and end indices of the visible items based on scroll position
    const start = Math.floor(container?.scrollTop / itemHeight);
    const end = start + Math.ceil(container?.clientHeight / itemHeight) + 2;
    // Update the visible items array
    setVisibleItems(items.slice(start, end));
  }, 20);

  const handleScroll = () => {
    // RequestAnimationFrame to improve scroll performance
    requestAnimationFrame(updateVisibleItems);
  };

  // Effect to update visible items when the items array changes
  useEffect(() => {
    if (items?.length) {
      updateVisibleItems();
    }
  }, [items]);

  return (
    <div
      style={{
        overflowY: "scroll",
        maxHeight: "94vh",
      }}
      onScroll={handleScroll}
      ref={containerRef}
    >
      <div style={{ height: `${items.length * itemHeight}px` }}>
        <div
          style={{
            position: "relative",
            height: `${visibleItems.length * itemHeight}px`,
            top: `${
              Math.floor((containerRef.current?.scrollTop || 0) / itemHeight) *
              itemHeight
            }px`,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={item[indexKey] as string}
              style={{ height: `${itemHeight}px` }}
            >
              {renderRow(item, index)}
            </div>
          ))}
          {isFetchingNextPage && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
};
export default VirtualizedList;

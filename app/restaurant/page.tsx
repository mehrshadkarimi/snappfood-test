"use client";
import React, { useCallback, useMemo, useRef } from "react";
import VendorCard from "@/components/VendorCard";
import styles from "./restaurant.module.scss";
import VirtualizedList from "@/components/VirtualizedList";
import { useInfiniteQuery } from "@tanstack/react-query";
import apiService from "@/services/apiService";

const Restaurant: React.FC = () => {
  // Create a reference to store a set of vendor data
  const vendorListRef = useRef<Set<any>>(new Set());

  const fetchData = useCallback(async ({ pageParam = 0 }) => {
    const result = await apiService(
      "GET",
      `/restaurant/vendors-list?page=${pageParam}&page_size=10&lat=35.75&long=51.41`
    );
    if (result.isSuccess) {
      return result.data;
    } else {
      console.log(JSON.stringify(result.error), "error");
    }
  }, []);
  // Use the Infinite Query hook to fetch paginated vendor data
  const { fetchNextPage, isFetchingNextPage, data } = useInfiniteQuery({
    queryKey: ["vendors"],
    queryFn: fetchData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // Return the next page number for pagination
      return Number(lastPageParam) + 1;
    },
    refetchOnWindowFocus: false,
  });

  // Memoize vendors to avoid unnecessary re-renders
  const vendors = useMemo(() => {
    // Check if data.pages exists
    if (data?.pages) {
      // Get the last loaded page number
      const lastLoadedPage = data?.pageParams[
        data?.pageParams.length - 1
      ] as number;

      // Iterate over the vendors in the last loaded page and add them to the set
      data?.pages[lastLoadedPage]?.data.finalResult?.forEach(
        (vendor: { type: string; data: unknown }) => {
          if (vendor?.type === "VENDOR") {
            vendorListRef.current.add(vendor?.data);
          }
        }
      );

      return Array.from(vendorListRef.current.values());
    } else return []; // Return an empty array if data.pages doesn't exist
  }, [data]);

  // Render the Restaurant component
  return (
    <div className={styles.container}>
      <VirtualizedList
        onScrollEnd={fetchNextPage} // Callback for fetching the next page on scroll end
        isFetchingNextPage={isFetchingNextPage} // Flag indicating whether the next page is being fetched
        items={vendors} // Array of vendor data to be displayed
        itemHeight={250} // Height of each item in the list
        renderRow={(item) => <VendorCard {...item} />} // Render each row using VendorCard component
        indexKey="id" // Key to uniquely identify each item in the list
      />
    </div>
  );
};

export default Restaurant;

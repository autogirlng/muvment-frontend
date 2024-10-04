"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { FullPageSpinner } from "@repo/ui/spinner";
import Icons from "@repo/ui/icons";
import Button from "@repo/ui/button";
import Pagination from "@repo/ui/pagination";
import SearchInput from "@repo/ui/searchInput";
import EmptyState from "@/components/EmptyState";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import ListingCard from "@/components/Listings/ListingCard";
import useListings from "@/hooks/useListings";

export default function ListingsPage() {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const { listings, totalCount, isError, isLoading } = useListings({
    currentPage,
    pageLimit,
  });

  return (
    <main className="space-y-6 py-[56px]">
      <DashboardSectionTitle icon={Icons.ic_car} title="Listings" />
      <div className="flex justify-between items-center">
        <SearchInput
          placeholder="Search"
          name="listingsSearch"
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
        />
        <Link href="/vehicle-onboarding">
          <Button
            variant="filled"
            color="primary"
            className="flex items-center gap-2 !py-2 !px-4 !text-sm 3xl:!text-base button_icon"
          >
            {Icons.ic_add_circle} <span>Add New Vehicle</span>
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <FullPageSpinner />
      ) : isError ? (
        <p>something went wrong</p>
      ) : (
        <>
          {listings.length > 0 ? (
            listings.map((listing, index) => (
              <ListingCard key={index} listing={listing} />
            ))
          ) : (
            <EmptyState
              title="No Listing"
              message={
                <Link href="/vehicle-onboarding" className="text-primary-500">
                  add your first vehicle
                </Link>
              }
              image="/icons/empty_booking_state.png"
            />
          )}
        </>
      )}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageLimit={pageLimit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
}

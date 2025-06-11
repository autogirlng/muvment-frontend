import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useHttp } from "@/hooks/useHttp";

type FavoriteVehicle = {
    id: string;
    vehicleId: string;
    userId: string;
    createdAt: string;
};

type FavoritesResponse = {
    data: FavoriteVehicle[];
    totalCount: number;
};

export default function useFavorites() {
    const http = useHttp();
    const queryClient = useQueryClient();

    // Fetch user's favorites
    const {
        data: favoritesData,
        isLoading: isLoadingFavorites,
        isError: isFavoritesError,
        error: favoritesError,
    } = useQuery({
        queryKey: ["favorites"],
        queryFn: async () => http.get<FavoritesResponse>("/api/favorites"),
        retry: false,
    });

    // Add to favorites mutation
    const addToFavoritesMutation = useMutation({
        mutationFn: async (vehicleId: string) =>
            http.post("/api/favorites", { vehicleId }),
        onSuccess: () => {
            // Invalidate and refetch favorites
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
        onError: (error) => {
            console.error("Error adding to favorites:", error);
        },
    });

    // Remove from favorites mutation
    const removeFromFavoritesMutation = useMutation({
        mutationFn: async (vehicleId: string) =>
            http.delete(`/api/favorites/${vehicleId}`),
        onSuccess: () => {
            // Invalidate and refetch favorites
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
        onError: (error) => {
            console.error("Error removing from favorites:", error);
        },
    });

    // Helper function to check if a vehicle is favorited
    const isVehicleFavorited = (vehicleId: string): boolean => {
        if (!favoritesData?.data) return false;
        return favoritesData.data.some((fav) => fav.vehicleId === vehicleId);
    };

    // Helper function to get favorite vehicle IDs
    const getFavoriteVehicleIds = (): string[] => {
        if (!favoritesData?.data) return [];
        return favoritesData.data.map((fav) => fav.vehicleId);
    };

    // Toggle favorite function
    const toggleFavorite = async (vehicleId: string) => {
        const isFavorited = isVehicleFavorited(vehicleId);

        if (isFavorited) {
            await removeFromFavoritesMutation.mutateAsync(vehicleId);
            console.log(`Vehicle ${vehicleId} removed from favorites`);
        } else {
            await addToFavoritesMutation.mutateAsync(vehicleId);
            console.log(`Vehicle ${vehicleId} added to favorites`);
        }
    };

    return {
        // Data
        favorites: favoritesData?.data || [],
        favoriteVehicleIds: getFavoriteVehicleIds(),
        totalFavorites: favoritesData?.totalCount || 0,

        // Loading states
        isLoadingFavorites,
        isAddingToFavorites: addToFavoritesMutation.isPending,
        isRemovingFromFavorites: removeFromFavoritesMutation.isPending,
        isUpdatingFavorites:
            addToFavoritesMutation.isPending || removeFromFavoritesMutation.isPending,

        // Error states
        isFavoritesError,
        favoritesError,
        addToFavoritesError: addToFavoritesMutation.error,
        removeFromFavoritesError: removeFromFavoritesMutation.error,

        // Functions
        isVehicleFavorited,
        toggleFavorite,
        addToFavorites: addToFavoritesMutation.mutateAsync,
        removeFromFavorites: removeFromFavoritesMutation.mutateAsync,
    };
}
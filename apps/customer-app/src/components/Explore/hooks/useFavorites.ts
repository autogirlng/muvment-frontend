import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useHttp } from "@/hooks/useHttp";
import { useAppSelector } from "@/lib/hooks";

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
  const { user } = useAppSelector((state) => state.user);

  const {
    data: favoritesData,
    isLoading: isLoadingFavorites,
    isError: isFavoritesError,
    error: favoritesError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => http.get<FavoritesResponse>("/api/favorites"),
    retry: false,
    enabled: !!user,
  });

  const addToFavoritesMutation = useMutation({
    mutationFn: async (vehicleId: string) =>
      http.post("/api/favorites", { vehicleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      console.error("Error adding to favorites:", error);
    },
  });

  const removeFromFavoritesMutation = useMutation({
    mutationFn: async (vehicleId: string) =>
      http.delete(`/api/favorites/${vehicleId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      console.error("Error removing from favorites:", error);
    },
  });

  const isVehicleFavorited = (vehicleId: string): boolean => {
    if (!user || !favoritesData?.data) return false;
    return favoritesData.data.some((fav) => fav.vehicleId === vehicleId);
  };

  const getFavoriteVehicleIds = (): string[] => {
    if (!user || !favoritesData?.data) return [];
    return favoritesData.data.map((fav) => fav.vehicleId);
  };

  const toggleFavorite = async (
    vehicleId: string
  ): Promise<{ requiresLogin: boolean }> => {
    if (!user) {
      return { requiresLogin: true };
    }

    const isFavorited = isVehicleFavorited(vehicleId);

    if (isFavorited) {
      await removeFromFavoritesMutation.mutateAsync(vehicleId);
      console.log(`Vehicle ${vehicleId} removed from favorites`);
    } else {
      await addToFavoritesMutation.mutateAsync(vehicleId);
      console.log(`Vehicle ${vehicleId} added to favorites`);
    }

    return { requiresLogin: false };
  };

  return {
    favorites: favoritesData?.data || [],
    favoriteVehicleIds: getFavoriteVehicleIds(),
    totalFavorites: favoritesData?.totalCount || 0,

    isUserLoggedIn: !!user,
    isLoadingFavorites: user ? isLoadingFavorites : false,
    isAddingToFavorites: addToFavoritesMutation.isPending,
    isRemovingFromFavorites: removeFromFavoritesMutation.isPending,
    isUpdatingFavorites:
      addToFavoritesMutation.isPending || removeFromFavoritesMutation.isPending,

    isFavoritesError: user ? isFavoritesError : false,
    favoritesError,
    addToFavoritesError: addToFavoritesMutation.error,
    removeFromFavoritesError: removeFromFavoritesMutation.error,

    isVehicleFavorited,
    toggleFavorite,
    addToFavorites: addToFavoritesMutation.mutateAsync,
    removeFromFavorites: removeFromFavoritesMutation.mutateAsync,
  };
}

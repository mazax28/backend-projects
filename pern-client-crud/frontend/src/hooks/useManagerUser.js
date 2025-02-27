import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient, updateClient, deleteClient } from "../api/apiClient";

const useManagerUser = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })


  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
};

export default useManagerUser

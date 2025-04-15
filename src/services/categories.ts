import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useCategories = () => {
    return useQuery('categories', async () => {
      const { data } = await axiosInstance.get('/categories');
      return data;
    });
  };
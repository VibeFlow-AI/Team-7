"use client";

import { useState, useEffect } from "react";

export function useFormPersistence<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setState(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  // Clear form data when component unmounts or when form is successfully submitted
  const clearForm = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return [state, setValue, clearForm];
}

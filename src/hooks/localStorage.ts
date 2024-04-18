import { useEffect, useState } from "react";

export function useLocalStorage<T>(
	key: string,
	defaultValue: T
): [T, (value: T) => void] {
	const [value, setValue] = useState<T>(() => {
		// Get the initial value from localStorage
		const item = localStorage.getItem(key);
		return item ? (JSON.parse(item) as T) : defaultValue;
	});

	// Effect for listening to changes from other tabs
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent): void => {
			if (event.key === key) {
				setValue(
					event.newValue ? (JSON.parse(event.newValue) as T) : defaultValue
				);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [key, defaultValue]);

	const setValueWrap = (value: T): void => {
		try {
			// Update the local state
			setValue(value);
			// Update localStorage
			localStorage.setItem(key, JSON.stringify(value));
			// Manually dispatch a storage event to update the same tab
			window.dispatchEvent(
				new StorageEvent("storage", {
					key: key,
					newValue: JSON.stringify(value),
					oldValue: localStorage.getItem(key),
				})
			);
		} catch (e) {
			console.error("Error writing to localStorage:", e);
		}
	};

	return [value, setValueWrap];
}

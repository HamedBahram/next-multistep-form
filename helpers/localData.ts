type LocalDataProps = {
    item: string;
    type: 'set' | 'get';
    data?: any;
}

export default function localData({ item, type, data }: LocalDataProps) {
    try {
        if (type === "get") {
            const retrievedData = localStorage.getItem(item);
            return retrievedData ? JSON.parse(retrievedData) : null; // Return null if no data
        } else if (type === "set" && data !== undefined) { // Check if data is provided when type is set
            localStorage.setItem(item, JSON.stringify(data));
            return true; // Successfully set data
        }
    } catch (error) {
        console.error("Error handling localStorage data:", error);
        return false; // Indicate that an error occurred
    }
}
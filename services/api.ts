const API_URL = "http://10.170.100.75:8000";
const TIMEOUT = 5000;

export const countingService = {
    submitCount: async (data: {
        Checker: string;
        Location: string;
        CountPallet: number;
        Timestamp: string;
    }) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

        try {
            const response = await fetch(`${API_URL}/counts`, {
                method: "POST",  // เปลี่ยนเป็น POST
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data), // เพิ่ม body data
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error details:', error);
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }
};
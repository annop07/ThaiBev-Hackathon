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
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error: any) {
            console.error('API Error details:', error);
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    },
    getMasterItems: async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
        try {
            const response = await fetch(`${API_URL}/master/items?limit=100`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }
};

export const wmsService = {
    getItems: async (limit: number = 100): Promise<WMSResponse> => {
        try {
            const response = await fetch(
                `${API_URL}/master/items?limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        // เพิ่ม headers เพื่อแก้ปัญหา CORS
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET",
                    },
                    mode: 'cors', // เพิ่ม CORS mode
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data); // เพิ่ม log เพื่อดูข้อมูลที่ได้

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};
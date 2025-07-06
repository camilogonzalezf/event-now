import api from "./api";

export interface Event {
  id: number;
  name: string;
  city: string;
  date: string;
  description?: string;
}

export async function getFilteredEvents(filters: {
  text?: string;
  city?: string;
  date?: string;
}): Promise<Event[] | { success: false; message: string }> {
  try {
    const params: Record<string, string> = {};
    if (filters.text) params.text = filters.text;
    if (filters.city) params.city = filters.city;
    if (filters.date) params.date = filters.date;
    const resp = await api.get<Event[]>("/events", { params });
    return resp.data;
  } catch (error) {
    console.error("fetchFilteredEvents error:", error);

    return {
      success: false,
      message: "Ocurrió un problema para obtener el listado de eventos",
    };
  }
}

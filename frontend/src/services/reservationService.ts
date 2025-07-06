import api from "./api";

export interface ReservationPayload {
  eventId: number;
  name: string;
  email: string;
  date: string;
  tickets: number;
}

export interface ReservationResult {
  success: boolean;
  message: string;
}

export async function postReservation(
  data: ReservationPayload
): Promise<ReservationResult> {
  try {
    await api.post("/reservations", data);
    return { success: true, message: "Reserva creada con éxito" };
  } catch (error: any) {
    console.error("postReservation error:", error);
    return {
      success: false,
      message: "Ocurrió un problema para reservar, inténtalo de nuevo",
    };
  }
}

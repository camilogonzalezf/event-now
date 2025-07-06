import { useState, useCallback, useEffect } from "react";
import { Event, getFilteredEvents } from "../services/eventService";
import {
  ReservationPayload,
  ReservationResult,
  postReservation,
} from "../services/reservationService";
import { notification } from "antd";

export function useManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetFilteredEvents = useCallback(
    async (filters: { text?: string; city?: string; date?: string }) => {
      setLoading(true);
      const data = await getFilteredEvents(filters);
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        notification.error({
          message: "Error",
          description: data.message,
          placement: "topRight",
        });
        setEvents([]);
      }
      setLoading(false);
    },
    []
  );

  const handleRegisterReservation = useCallback(
    async (payload: ReservationPayload): Promise<ReservationResult> => {
      const result = await postReservation(payload);
      return result;
    },
    []
  );

  useEffect(() => {
    handleGetFilteredEvents({});
  }, [handleGetFilteredEvents]);

  return {
    events,
    loading,
    handleGetFilteredEvents,
    handleRegisterReservation,
  };
}

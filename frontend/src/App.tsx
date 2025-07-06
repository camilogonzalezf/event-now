import React, { useState } from "react";
import Filter, { FilterValues } from "./components/Filter";
import ReservationForm from "./components/ReservationForm";
import FiltersTable from "./components/FiltersTable";
import { Event } from "./services/eventService";
import { useManageEvents } from "./hooks/useManageEvents";
import { Button } from "antd";

export default function App() {
  const [filters, setFilters] = useState<FilterValues>({});
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [modalVisible, setModalVisible] = useState(false);
  const {
    events,
    loading,
    handleGetFilteredEvents,
    handleRegisterReservation,
  } = useManageEvents();

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedEvent(undefined);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <header>
        <picture>
          <source
            media="(max-width: 600px)"
            srcSet="/images/banner_mobile.webp"
          />
          <source
            media="(min-width: 601px)"
            srcSet="/images/banner_desktop.webp"
          />
          <img
            src="/images/banner_desktop.webp"
            alt="EventNow Banner"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "2rem",
            }}
          />
        </picture>
        <nav
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            type="primary"
            href="/reservations"
            style={{
              marginBottom: "1rem",
              backgroundColor: "#2A9C90",
              fontSize: "16px",
              padding: "20px 10px",
            }}
          >
            Ver todas las reservas
          </Button>
        </nav>
      </header>

      <main>
        <section>
          <h1 style={{ color: "#CF3C44" }}>Reserva tu Entrada</h1>
          <Filter onFilter={setFilters} />
        </section>

        <section>
          <FiltersTable
            filters={filters}
            onEventSelect={handleEventSelect}
            selectedEventId={selectedEvent?.id}
            events={events}
            loading={loading}
            handleGetFilteredEvents={handleGetFilteredEvents}
          />
        </section>
      </main>

      <ReservationForm
        initialFilter={filters}
        selectedEvent={selectedEvent}
        events={events}
        loading={loading}
        visible={modalVisible}
        onCancel={handleModalCancel}
        handleRegisterReservation={handleRegisterReservation}
      />
    </div>
  );
}

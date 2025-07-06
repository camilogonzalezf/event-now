import React from "react";
import { Table, Card, Button } from "antd";
import { FilterValues } from "./Filter";
import { Event } from "../services/eventService";

interface FiltersTableProps {
  filters: FilterValues;
  onEventSelect?: (event: Event) => void;
  selectedEventId?: number;
  events: Event[];
  loading: boolean;
  handleGetFilteredEvents: (filters: {
    text?: string;
    city?: string;
    date?: string;
  }) => Promise<void>;
}

export default function FiltersTable({
  filters,
  onEventSelect,
  selectedEventId,
  events,
  loading,
  handleGetFilteredEvents,
}: FiltersTableProps) {
  // Cargar eventos cuando cambien los filtros
  React.useEffect(() => {
    if (Object.keys(filters).length > 0) {
      handleGetFilteredEvents(filters);
    }
  }, [filters, handleGetFilteredEvents]);

  const columns = [
    {
      title: "Evento",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Event) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{text}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {record.city} • {new Date(record.date).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (text: string) => text || "Sin descripción",
    },
    {
      title: "Acción",
      key: "action",
      render: (record: Event) => (
        <Button
          type={selectedEventId === record.id ? "primary" : "default"}
          onClick={() => onEventSelect?.(record)}
          disabled={loading}
        >
          {selectedEventId === record.id ? "Seleccionado" : "Seleccionar"}
        </Button>
      ),
    },
  ];

  // No mostrar si no hay eventos
  if (events.length === 0) {
    return null;
  }

  return (
    <Card
      title={<span style={{ color: "#CF3C44" }}>Eventos encontrados</span>}
      style={{ marginBottom: 16 }}
    >
      <Table
        dataSource={events}
        columns={columns}
        pagination={false}
        size="small"
        showHeader={true}
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
}

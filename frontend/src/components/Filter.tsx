import React from "react";
import { Form, Input, DatePicker, Button, Card } from "antd";

export interface FilterValues {
  text?: string;
  city?: string;
  date?: string;
}

export interface FilterProps {
  onFilter: (values: FilterValues) => void;
}

export default function Filter({ onFilter }: FilterProps) {
  const [form] = Form.useForm();

  const handleClick = () => {
    const { text, city, date } = form.getFieldsValue();
    onFilter({
      text,
      city,
      date: date?.format("YYYY-MM-DD"),
    });
  };

  return (
    <Card
      title={<span style={{ color: "#CF3C44" }}>Filtrar eventos</span>}
      style={{ marginBottom: 16 }}
    >
      <Form form={form} layout="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            alignItems: "end",
          }}
        >
          <Form.Item name="text" label="Buscar">
            <Input
              placeholder="texto..."
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="city" label="Ciudad">
            <Input
              placeholder="Bogotá, ..."
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="date" label="Fecha">
            <DatePicker picker="date" size="large" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={handleClick}
              type="primary"
              size="large"
              style={{ width: "100%", backgroundColor: "#EBB434" }}
            >
              Filtrar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
}

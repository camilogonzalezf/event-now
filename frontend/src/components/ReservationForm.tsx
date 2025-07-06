import React from "react";
import {
  Form,
  Select,
  Input,
  DatePicker,
  InputNumber,
  Button,
  message,
  Spin,
  Modal,
} from "antd";
import { Event } from "../services/eventService";
import { FilterValues } from "./Filter";
import {
  ReservationPayload,
  ReservationResult,
} from "../services/reservationService";

export interface ReservationFormProps {
  initialFilter?: FilterValues;
  selectedEvent?: Event;
  events: Event[];
  loading: boolean;
  visible: boolean;
  onCancel: () => void;
  handleRegisterReservation: (
    payload: ReservationPayload
  ) => Promise<ReservationResult>;
}

export default function ReservationForm({
  initialFilter,
  selectedEvent,
  events,
  loading,
  visible,
  onCancel,
  handleRegisterReservation,
}: ReservationFormProps) {
  const [form] = Form.useForm();

  // Establecer el evento seleccionado en el formulario cuando cambie
  React.useEffect(() => {
    if (selectedEvent) {
      form.setFieldsValue({ eventId: selectedEvent.id });
    }
  }, [selectedEvent, form]);

  const onFinish = async (values: any) => {
    const result = await handleRegisterReservation(values);
    message[result.success ? "success" : "error"](result.message);
    if (result.success) {
      form.resetFields();
      onCancel();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Formulario de reserva"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="eventId"
            label="Evento"
            rules={[{ required: true, message: "Seleccione un evento" }]}
          >
            <Select
              placeholder="Selecciona un evento"
              disabled={!!selectedEvent}
            >
              {events.map((e: Event) => (
                <Select.Option key={e.id} value={e.id}>
                  {e.name} — {new Date(e.date).toLocaleDateString()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: "Nombre requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email requerido" },
              { type: "email", message: "Email no válido" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="date"
            label="Fecha y hora"
            rules={[{ required: true, message: "Fecha requerida" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="tickets"
            label="Entradas"
            rules={[
              { required: true, message: "Entradas requeridas" },
              {
                type: "number",
                min: 1,
                max: 10,
                message: "Debes seleccionar entre 1 y 10 entradas",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              max={10}
              precision={0}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) e.preventDefault();
              }}
              inputMode="numeric"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Reservar
            </Button>
            <Button onClick={handleCancel}>Cancelar</Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

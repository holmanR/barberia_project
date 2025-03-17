import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Select, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const initialServices = [
  { id: 1, name: "Corte de Cabello", description: "Corte moderno y clásico.", price: "$15", slots: ["10:00 AM", "12:00 PM", "3:00 PM"] },
  { id: 2, name: "Barba", description: "Perfilado y afeitado profesional.", price: "$10", slots: ["11:00 AM", "1:00 PM", "4:00 PM"] },
  { id: 3, name: "Cejas", description: "Arreglo y perfilado de cejas.", price: "$8", slots: ["9:00 AM", "2:00 PM", "5:00 PM"] }
];

export default function Barberia() {
  const [services, setServices] = useState(initialServices);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [adminService, setAdminService] = useState(initialServices[0].id);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [period, setPeriod] = useState("AM");

  const handleReserve = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleAddSlot = () => {
    setServices(prevServices => prevServices.map(service => {
      if (service.id === adminService) {
        return { ...service, slots: [...service.slots, `${day} ${time} ${period}`] };
      }
      return service;
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Administración</h1>
      <div className="flex justify-center mb-6">
        <Card className="p-6 w-full max-w-md">
          <CardContent>
            <Select value={adminService} onChange={(e) => setAdminService(Number(e.target.value))}>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
              ))}
            </Select>
            <Input placeholder="Día" value={day} onChange={(e) => setDay(e.target.value)} className="mt-4" />
            <Input placeholder="Hora" value={time} onChange={(e) => setTime(e.target.value)} className="mt-4" />
            <Select value={period} onChange={(e) => setPeriod(e.target.value)} className="mt-4">
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </Select>
            <Button onClick={handleAddSlot} className="mt-4 w-full">Agregar Turno</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="p-4 flex flex-col justify-between">
            <CardContent>
              <h2 className="text-xl font-bold">{service.name}</h2>
              <p className="text-sm text-gray-600">{service.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-semibold">{service.price}</span>
                <Button onClick={() => handleReserve(service)}>Reservar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3 className="text-xl font-bold mb-4">Turnos Disponibles para {selectedService.name}</h3>
          <ul>
            {selectedService.slots.map((slot, index) => (
              <li key={index} className="py-2 border-b">{slot}</li>
            ))}
          </ul>
          <Button className="mt-4" onClick={() => setModalOpen(false)}>Cerrar</Button>
        </Modal>
      )}
    </div>
  );
}
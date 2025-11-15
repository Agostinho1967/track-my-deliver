import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Filter } from "lucide-react";

// Mock data
const allDeliveries = [
  {
    id: "1",
    recipient: "João Silva",
    origin: "Centro de Distribuição",
    status: "entregue",
    date: "2025-11-15",
    time: "14:30",
    notes: "Entregue com sucesso",
  },
  {
    id: "2",
    recipient: "Maria Santos",
    origin: "Fornecedor ABC",
    status: "pendente",
    date: "2025-11-15",
    time: "15:00",
    notes: "Aguardando confirmação",
  },
  {
    id: "3",
    recipient: "Carlos Oliveira",
    origin: "Centro de Distribuição",
    status: "atrasada",
    date: "2025-11-14",
    time: "10:00",
    notes: "Cliente não estava no local",
  },
  {
    id: "4",
    recipient: "Ana Costa",
    origin: "Importadora XYZ",
    status: "entregue",
    date: "2025-11-15",
    time: "13:15",
    notes: "Recebido por porteiro",
  },
  {
    id: "5",
    recipient: "Pedro Martins",
    origin: "Centro de Distribuição",
    status: "entregue",
    date: "2025-11-14",
    time: "16:45",
    notes: "Entrega confirmada",
  },
  {
    id: "6",
    recipient: "Juliana Ferreira",
    origin: "Fornecedor ABC",
    status: "pendente",
    date: "2025-11-16",
    time: "09:00",
    notes: "Entrega programada",
  },
];

const getStatusBadge = (status: string) => {
  const variants = {
    entregue: { variant: "default" as const, className: "bg-success hover:bg-success/80", label: "Entregue" },
    pendente: { variant: "secondary" as const, className: "bg-warning/20 text-warning-foreground", label: "Pendente" },
    atrasada: { variant: "destructive" as const, className: "", label: "Atrasada" },
  };
  const config = variants[status as keyof typeof variants] || variants.pendente;
  return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
};

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredDeliveries = allDeliveries.filter((delivery) => {
    const matchesSearch = 
      delivery.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;
    const matchesDate = !dateFilter || delivery.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Entregas</h1>
        <p className="text-muted-foreground">Consulte e filtre todas as entregas registradas</p>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Buscar
              </Label>
              <Input
                id="search"
                placeholder="Destinatário ou origem..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="entregue">Entregue</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="atrasada">Atrasada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data
              </Label>
              <Input
                id="date"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>

          {(searchTerm || statusFilter !== "all" || dateFilter) && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredDeliveries.length} {filteredDeliveries.length === 1 ? "resultado encontrado" : "resultados encontrados"}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setDateFilter("");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deliveries List */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredDeliveries.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                Nenhuma entrega encontrada com os filtros selecionados.
              </div>
            ) : (
              filteredDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{delivery.recipient}</p>
                        {getStatusBadge(delivery.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Origem: {delivery.origin}
                      </p>
                      {delivery.notes && (
                        <p className="text-sm text-muted-foreground italic">
                          {delivery.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium">{delivery.date}</p>
                      <p className="text-muted-foreground">{delivery.time}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

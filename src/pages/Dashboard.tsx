import { Package, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data
const stats = [
  {
    title: "Total de Entregas",
    value: "156",
    icon: Package,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Entregues",
    value: "142",
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Pendentes",
    value: "12",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Atrasadas",
    value: "2",
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

const recentDeliveries = [
  {
    id: "1",
    recipient: "João Silva",
    origin: "Centro de Distribuição",
    status: "entregue",
    date: "2025-11-15",
    time: "14:30",
  },
  {
    id: "2",
    recipient: "Maria Santos",
    origin: "Fornecedor ABC",
    status: "pendente",
    date: "2025-11-15",
    time: "15:00",
  },
  {
    id: "3",
    recipient: "Carlos Oliveira",
    origin: "Centro de Distribuição",
    status: "atrasada",
    date: "2025-11-14",
    time: "10:00",
  },
  {
    id: "4",
    recipient: "Ana Costa",
    origin: "Importadora XYZ",
    status: "entregue",
    date: "2025-11-15",
    time: "13:15",
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

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema de entregas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Deliveries */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Entregas Recentes</CardTitle>
            <Link to="/history">
              <Button variant="ghost" size="sm">Ver todas</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium">{delivery.recipient}</p>
                  <p className="text-sm text-muted-foreground">
                    {delivery.origin}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{delivery.date}</p>
                    <p className="text-xs text-muted-foreground">{delivery.time}</p>
                  </div>
                  {getStatusBadge(delivery.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

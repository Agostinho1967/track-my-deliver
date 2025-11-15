import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Package } from "lucide-react";

export default function NewDelivery() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    recipient: "",
    origin: "",
    expectedDate: "",
    status: "pendente",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - em produção, conectar com Lovable Cloud
    toast({
      title: "Entrega registrada!",
      description: `Entrega para ${formData.recipient} foi registrada com sucesso.`,
    });
    
    navigate("/");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nova Entrega</h1>
        <p className="text-muted-foreground">Registre uma nova entrega no sistema</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Informações da Entrega</CardTitle>
              <CardDescription>Preencha os dados abaixo</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="recipient">Destinatário *</Label>
                <Input
                  id="recipient"
                  placeholder="Nome do destinatário"
                  value={formData.recipient}
                  onChange={(e) => handleChange("recipient", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin">Origem *</Label>
                <Input
                  id="origin"
                  placeholder="Local de origem"
                  value={formData.origin}
                  onChange={(e) => handleChange("origin", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedDate">Data Prevista *</Label>
                <Input
                  id="expectedDate"
                  type="date"
                  value={formData.expectedDate}
                  onChange={(e) => handleChange("expectedDate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status Inicial *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="atrasada">Atrasada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Adicione observações sobre a entrega..."
                rows={4}
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Registrar Entrega
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

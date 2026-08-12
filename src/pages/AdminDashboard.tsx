import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/auth";
import { db, Order, OrderStatus } from "@/lib/db";
import { formatDate, sareeCountLabel, sareeTypesLabel, BookingData } from "@/lib/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessSettings, saveBusinessSettings, BusinessSettings } from "@/data/business";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Search,
  LogOut,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Scissors,
  Users,
  Download,
  Calendar,
  Phone,
  MapPin,
  Sparkles,
  RefreshCw,
  MoreVertical,
  Settings,
} from "lucide-react";

export const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsData, setSettingsData] = useState<BusinessSettings>({
    name: "",
    shortName: "",
    tagline: "",
    phone: "",
    phoneIntl: "",
    email: "",
    locationLabel: "",
    locationNote: "",
    mapsUrl: "",
  });
  const navigate = useNavigate();

  const handleOpenSettings = () => {
    setSettingsData(getBusinessSettings());
    setIsSettingsOpen(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = settingsData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    const updatedSettings: BusinessSettings = {
      ...settingsData,
      phone: cleanPhone,
      phoneIntl: `91${cleanPhone}`,
    };

    saveBusinessSettings(updatedSettings);
    toast({
      title: "Settings Saved",
      description: "Business contact details updated. Page will reload to apply changes.",
    });
    setIsSettingsOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  const loadOrders = async () => {
    setLoading(true);
    const data = await db.getOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    // Auth Guard
    if (!auth.isAuthenticated()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    loadOrders();
  }, [navigate]);

  const handleLogout = () => {
    auth.logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel.",
    });
    navigate("/admin/login", { replace: true });
  };

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    const updated = await db.updateOrderStatus(id, newStatus);
    if (updated) {
      toast({
        title: "Order Updated",
        description: `Order status updated to ${newStatus}.`,
      });
      // Refresh local state
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder(updated);
      }
    } else {
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this order record?")) return;

    const success = await db.deleteOrder(id);
    if (success) {
      toast({
        title: "Order Deleted",
        description: "Order record has been removed.",
      });
      setOrders((prev) => prev.filter((o) => o.id !== id));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder(null);
      }
    } else {
      toast({
        title: "Error",
        description: "Failed to delete order.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    if (orders.length === 0) {
      toast({
        title: "Export Failed",
        description: "No orders to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      "ID",
      "Date Created",
      "Name",
      "Phone",
      "Saree Count",
      "Saree Types",
      "Services",
      "Required By",
      "Location",
      "Festival Occasion",
      "Festive Service",
      "Additional Requirements",
      "Status",
    ];

    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleDateString("en-IN"),
      o.name,
      o.phone,
      sareeCountLabel(o as unknown as BookingData),
      sareeTypesLabel(o as unknown as BookingData),
      o.servicesRequired.join(", "),
      o.requiredByDate ? new Date(o.requiredByDate).toLocaleDateString("en-IN") : "Not specified",
      o.location,
      o.festivalOccasion || "None",
      o.festiveService || "None",
      o.additionalRequirements || "None",
      o.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join(
        "\n"
      );

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `durgas_saree_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Complete",
      description: "Orders successfully exported to CSV.",
    });
  };

  // Metrics calculation
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const inProgressOrders = orders.filter((o) => o.status === "In Progress").length;
  const completedOrders = orders.filter((o) => o.status === "Completed").length;

  const totalSareesCount = orders.reduce((acc, curr) => {
    if (curr.sareeCount === "more") {
      const parsed = parseInt(curr.approxCount, 10);
      return acc + (isNaN(parsed) ? 10 : parsed);
    }
    const parsed = parseInt(curr.sareeCount, 10);
    return acc + (isNaN(parsed) ? 0 : parsed);
  }, 0);

  // Filtering
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 gap-1 rounded-full px-3.5 py-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "In Progress":
        return (
          <Badge variant="outline" className="border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400 gap-1 rounded-full px-3.5 py-1">
            <Scissors className="h-3 w-3" /> In Progress
          </Badge>
        );
      case "Completed":
        return (
          <Badge variant="outline" className="border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 gap-1 rounded-full px-3.5 py-1">
            <CheckCircle className="h-3 w-3" /> Completed
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge variant="outline" className="border-red-500/50 bg-red-500/10 text-red-500 dark:text-red-400 gap-1 rounded-full px-3.5 py-1">
            <AlertTriangle className="h-3 w-3" /> Cancelled
          </Badge>
        );
      default:
        return <Badge className="rounded-full px-3.5 py-1">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-24">
      {/* Top Header navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-semibold text-primary">Durga's Admin</span>
            <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-medium tracking-wide text-primary-foreground uppercase">
              Control Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4 border-primary/30 text-primary hover:bg-secondary/40 gap-1.5"
              onClick={handleOpenSettings}
            >
              <Settings className="h-3.5 w-3.5" /> Business Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4"
              onClick={() => navigate("/")}
            >
              Go to Website
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
              className="rounded-full text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-7xl px-5 sm:px-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary">Order Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track customer requests, saree pleating counts, and updates.
          </p>
        </div>

        {/* Metrics Section */}
        <section className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card className="border border-border/60 shadow-soft bg-card/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Orders
              </CardTitle>
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{totalOrders}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Submitted inquiries</p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 shadow-soft bg-card/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Pending
              </CardTitle>
              <div className="h-7 w-7 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600">
                <Clock className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{pendingOrders}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 shadow-soft bg-card/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                In Progress
              </CardTitle>
              <div className="h-7 w-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Scissors className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{inProgressOrders}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Currently pleating/draping</p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 shadow-soft bg-card/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Sarees
              </CardTitle>
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{totalSareesCount}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Across all bookings</p>
            </CardContent>
          </Card>
        </section>

        {/* Filters and Controls */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/40 border border-border/50 p-4 rounded-2xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, phone or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-1 bg-secondary/30 border border-border p-1 rounded-xl">
              {["All", "Pending", "In Progress", "Completed", "Cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    statusFilter === status
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="rounded-xl h-10 gap-1.5"
            >
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={loadOrders}
              className="rounded-xl h-10 w-10 text-muted-foreground hover:text-foreground"
              title="Refresh Orders"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </section>

        {/* Orders Table Container */}
        <Card className="border border-border/60 shadow-soft overflow-hidden bg-card/80">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/20 hover:bg-secondary/20">
                  <TableHead className="font-semibold text-primary">Booking Date</TableHead>
                  <TableHead className="font-semibold text-primary">Customer</TableHead>
                  <TableHead className="font-semibold text-primary">Phone</TableHead>
                  <TableHead className="font-semibold text-primary">Saree Count</TableHead>
                  <TableHead className="font-semibold text-primary">Required Date</TableHead>
                  <TableHead className="font-semibold text-primary">Status</TableHead>
                  <TableHead className="font-semibold text-primary text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="h-6 w-6 animate-spin text-primary/50" />
                        <span>Loading orders...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No orders found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-secondary/10 transition-colors">
                      <TableCell className="font-medium text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.name}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5 max-w-[180px] truncate">
                          <MapPin className="h-3 w-3 shrink-0" /> {order.location}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-mono">{order.phone}</TableCell>
                      <TableCell className="text-sm font-medium">
                        {sareeCountLabel(order as unknown as BookingData)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {order.requiredByDate
                          ? new Date(order.requiredByDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })
                          : "—"}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-full h-8 w-8 text-muted-foreground hover:text-primary"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-card">
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(order.id, "Pending")}
                                className="text-xs py-2 gap-1.5 focus:bg-secondary"
                              >
                                <Clock className="h-3.5 w-3.5 text-yellow-500" /> Set Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(order.id, "In Progress")}
                                className="text-xs py-2 gap-1.5 focus:bg-secondary"
                              >
                                <Scissors className="h-3.5 w-3.5 text-blue-500" /> Set In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(order.id, "Completed")}
                                className="text-xs py-2 gap-1.5 focus:bg-secondary"
                              >
                                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Set Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(order.id, "Cancelled")}
                                className="text-xs py-2 gap-1.5 focus:bg-secondary"
                              >
                                <AlertTriangle className="h-3.5 w-3.5 text-red-500" /> Set Cancelled
                              </DropdownMenuItem>
                              <div className="h-px bg-border my-1" />
                              <DropdownMenuItem
                                onClick={() => handleDelete(order.id)}
                                className="text-xs py-2 gap-1.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Delete Record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl bg-card border border-border/80 rounded-2xl shadow-lift">
          {selectedOrder && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between pr-4 mt-2">
                  <DialogTitle className="font-serif text-2xl text-primary">
                    Order Details
                  </DialogTitle>
                  <div className="text-xs text-muted-foreground font-mono">
                    ID: {selectedOrder.id}
                  </div>
                </div>
                <DialogDescription>
                  Customer booking inquiry submitted on{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4 text-sm max-h-[70vh] overflow-y-auto pr-2">
                {/* Status bar */}
                <div className="flex flex-col gap-2 p-4 bg-secondary/20 rounded-xl border border-border/50 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                      Current Status:
                    </span>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Change to:</span>
                    <div className="flex gap-1">
                      {(["Pending", "In Progress", "Completed", "Cancelled"] as OrderStatus[]).map(
                        (st) => (
                          <button
                            key={st}
                            disabled={selectedOrder.status === st}
                            onClick={() => handleStatusChange(selectedOrder.id, st)}
                            className={`px-2 py-1 text-[10px] font-semibold rounded border transition-all ${
                              selectedOrder.status === st
                                ? "bg-primary/10 text-primary border-primary/20 opacity-50 cursor-not-allowed"
                                : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-secondary/40"
                            }`}
                          >
                            {st}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Customer Contact Details */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-border/50 p-4 rounded-xl space-y-2">
                    <h3 className="font-serif font-semibold text-primary flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-accent" /> Customer Details
                    </h3>
                    <div className="space-y-1">
                      <div className="font-medium text-base">{selectedOrder.name}</div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        <a href={`tel:${selectedOrder.phone}`} className="hover:underline font-mono">
                          {selectedOrder.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-1.5 text-muted-foreground mt-1.5">
                        <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>{selectedOrder.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border/50 p-4 rounded-xl space-y-2">
                    <h3 className="font-serif font-semibold text-primary flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-accent" /> Timing & Service Info
                    </h3>
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-muted-foreground text-xs block">Required By Date</span>
                        <span className="font-medium">
                          {selectedOrder.requiredByDate
                            ? new Date(selectedOrder.requiredByDate).toLocaleDateString("en-IN", {
                                dateStyle: "long",
                              })
                            : "Flexible / Not Specified"}
                        </span>
                      </div>
                      <div className="pt-1">
                        <span className="text-muted-foreground text-xs block">Occasion</span>
                        <Badge variant="secondary" className="mt-0.5">
                          {selectedOrder.festivalOccasion || "General / None"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Saree & Work Info */}
                <div className="border border-border/50 p-4 rounded-xl space-y-3">
                  <h3 className="font-serif font-semibold text-primary flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-accent" /> Saree Specifications
                  </h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2 text-xs">
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Saree Count</span>
                      <span className="text-sm font-medium">{sareeCountLabel(selectedOrder as unknown as BookingData)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Saree Fabric / Types</span>
                      <span className="text-sm font-medium">{sareeTypesLabel(selectedOrder as unknown as BookingData)}</span>
                    </div>
                  </div>

                  <div className="h-px bg-border/50 my-2" />

                  <div>
                    <span className="text-muted-foreground text-xs block mb-1">Services Requested</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedOrder.servicesRequired.map((srv, idx) => (
                        <Badge key={idx} variant="outline" className="border-accent/40 bg-accent/5 text-primary text-xs">
                          {srv}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedOrder.festiveService && selectedOrder.festiveService !== "No festive service" && (
                    <div className="mt-2">
                      <span className="text-muted-foreground text-xs block mb-0.5">Festive Add-on Service</span>
                      <span className="font-medium text-accent">{selectedOrder.festiveService}</span>
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div className="border border-border/50 p-4 rounded-xl space-y-1">
                  <span className="text-muted-foreground text-xs block">Additional Requirements / Notes</span>
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {selectedOrder.additionalRequirements.trim() || "No additional requirements specified by the client."}
                  </p>
                </div>

                {/* WhatsApp Chat link shortcut */}
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="w-full rounded-full"
                  >
                    <a
                      href={`https://wa.me/${selectedOrder.phone.replace(/[\s+-]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat with Customer on WhatsApp
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedOrder.id)}
                    className="rounded-full shrink-0"
                    title="Delete record"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md bg-card border border-border/80 rounded-2xl shadow-lift">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-primary flex items-center gap-2">
              <Settings className="h-5 w-5 text-accent" /> Business Settings
            </DialogTitle>
            <DialogDescription>
              Update contact info, location details, and email/WhatsApp settings across the site.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveSettings} className="space-y-4 py-2 text-sm">
            <div className="space-y-1">
              <label htmlFor="settings-name" className="text-xs font-semibold text-muted-foreground uppercase">
                Business Name
              </label>
              <Input
                id="settings-name"
                value={settingsData.name}
                onChange={(e) => setSettingsData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="rounded-xl font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="settings-phone" className="text-xs font-semibold text-muted-foreground uppercase">
                  WhatsApp / Phone
                </label>
                <Input
                  id="settings-phone"
                  type="tel"
                  placeholder="e.g. 9110304317"
                  value={settingsData.phone}
                  onChange={(e) => setSettingsData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="settings-email" className="text-xs font-semibold text-muted-foreground uppercase">
                  Business Email
                </label>
                <Input
                  id="settings-email"
                  type="email"
                  placeholder="e.g. name@domain.com"
                  value={settingsData.email}
                  onChange={(e) => setSettingsData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="settings-tagline" className="text-xs font-semibold text-muted-foreground uppercase">
                Tagline / Description
              </label>
              <Input
                id="settings-tagline"
                value={settingsData.tagline}
                onChange={(e) => setSettingsData(prev => ({ ...prev, tagline: e.target.value }))}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="settings-location" className="text-xs font-semibold text-muted-foreground uppercase">
                Location Label
              </label>
              <Input
                id="settings-location"
                placeholder="e.g. Jayanagar, Bengaluru"
                value={settingsData.locationLabel}
                onChange={(e) => setSettingsData(prev => ({ ...prev, locationLabel: e.target.value }))}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="settings-location-note" className="text-xs font-semibold text-muted-foreground uppercase">
                Location Note
              </label>
              <Input
                id="settings-location-note"
                placeholder="e.g. Pickup details shared over WhatsApp"
                value={settingsData.locationNote}
                onChange={(e) => setSettingsData(prev => ({ ...prev, locationNote: e.target.value }))}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="settings-maps" className="text-xs font-semibold text-muted-foreground uppercase">
                Google Maps Link (Directions URL)
              </label>
              <Input
                id="settings-maps"
                type="url"
                placeholder="e.g. https://maps.google.com/..."
                value={settingsData.mapsUrl}
                onChange={(e) => setSettingsData(prev => ({ ...prev, mapsUrl: e.target.value }))}
                className="rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsSettingsOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button type="submit" className="rounded-full">
                Save & Refresh
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

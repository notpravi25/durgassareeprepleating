import { BookingData } from "./booking";

export type OrderStatus = "Pending" | "In Progress" | "Completed" | "Cancelled";

export interface Order extends Omit<BookingData, "requiredByDate"> {
  id: string;
  createdAt: string;
  requiredByDate?: string; // Stored as ISO string
  status: OrderStatus;
}

const STORAGE_KEY = "durgas_saree_orders";

// Helper to get raw orders from localStorage
const getRawOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading orders from localStorage", error);
    return [];
  }
};

// Helper to save raw orders to localStorage
const saveRawOrders = (orders: Order[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Error saving orders to localStorage", error);
  }
};

export const db = {
  getOrders: async (): Promise<Order[]> => {
    // Simulating database latency
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getRawOrders().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  saveOrder: async (booking: BookingData): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const orders = getRawOrders();
    
    const newOrder: Order = {
      ...booking,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      requiredByDate: booking.requiredByDate
        ? new Date(booking.requiredByDate).toISOString()
        : undefined,
      status: "Pending",
    };

    orders.push(newOrder);
    saveRawOrders(orders);
    return newOrder;
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<Order | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const orders = getRawOrders();
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;

    orders[index].status = status;
    saveRawOrders(orders);
    return orders[index];
  },

  deleteOrder: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const orders = getRawOrders();
    const filtered = orders.filter((o) => o.id !== id);
    if (filtered.length === orders.length) return false;

    saveRawOrders(filtered);
    return true;
  },
};

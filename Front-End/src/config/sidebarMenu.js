import DashBoard from "../assets/icons/dashboard.svg";
import WorkStation from "../assets/icons/workstation.svg";
import ProductMaster from "../assets/icons/ProductMaster.svg";
import MyOrders from "../assets/icons/MyOrders.svg";
import UserManagement from "../assets/icons/UserManagement.svg";
import TemperatureHistory from "../assets/icons/TemperatureHistory.svg";
import NCMR from "../assets/icons/NCMR.svg";

export const menuItems = [
  {
    id: "dashboard",
    icon: DashBoard,
  },

  {
    id: "workstation",
    icon: WorkStation,
    path: "/workstation",
  },

  {
    id: "product",
    icon: ProductMaster,
  },

  {
    id: "orders",
    icon: MyOrders,
  },

  {
    id: "users",
    icon: UserManagement,
    path: "/users",
  },

  {
    id: "temperature",
    icon: TemperatureHistory,
  },

  {
    id: "ncmr",
    icon: NCMR,
  },
];
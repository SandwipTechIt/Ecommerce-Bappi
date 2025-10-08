import React from "react";
import { Link } from "react-router";

const Widget = ({
  totalProducts,
  totalOrders,
  pendingOrders,
  completedOrders,
  cancelledOrders,
  lifetimeOrder,
  lifetimeRevenue,
  todayOrders
}) => {
  console.log(todayOrders);
  const widgets = [
    {
      type: "totalProducts",
      title: "Products",
      to: "allProducts",
      link: "See all products",
      icon: "fa-box",
      bgColor: "bg-blue-600",
      iconColor: "text-blue-600",
      value: totalProducts,
    },
    {
      type: "totalOrders",
      title: "Current Orders",
      to: "orders",
      link: "View all orders",
      icon: "fa-cart-plus",
      bgColor: "bg-green-600",
      iconColor: "text-green-600",
      value: totalOrders,
    },
    {
      type: "pendingOrders",
      title: "Pending Orders",
      to: "orders/pending",
      link: "View pending orders",
      icon: "fa-clock",
      bgColor: "bg-yellow-500",
      iconColor: "text-yellow-500",
      value: pendingOrders,
    },
    {
      type: "completedOrders",
      title: "Completed Orders",
      to: "orders/completed",
      link: "View completed orders",
      icon: "fa-check",
      bgColor: "bg-sky-600",
      iconColor: "text-sky-600",
      value: completedOrders,
    },
    {
      type: "cancelOrders",
      title: "Canceled Orders",
      to: "orders/cancelled",
      link: "View cancelled orders",
      icon: "fa-check",
      bgColor: "bg-red-600",
      iconColor: "text-red-600",
      value: cancelledOrders,
    },
    {
      type: "lifetimeRevenue",
      title: "Life time Revenue",
      to: "",
      link: "",
      icon: "fa-solid fa-file-invoice-dollar",
      bgColor: "bg-fuchsia-600",
      iconColor: "text-fuchsia-600",
      value: lifetimeRevenue,
    },
    {
      type: "todayOrders",
      title: "Today's Orders",
      to: "",
      link: "",
      icon: "fa-dolly",
      bgColor: "bg-emerald-600",
      iconColor: "text-emerald-600",
      value: todayOrders,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-3">
      {widgets.map((widget) => (
        <div
          key={widget.type}
          className={`${widget.bgColor} flex justify-between p-4 shadow-md rounded-xl text-white`}
        >
          <div className="flex flex-col justify-between">
            <span className="font-bold text-lg">{widget.title}</span>
            <span className="text-3xl font-extrabold">{widget.value}</span>
            <Link
              to={`/${widget.to}`}
              className="w-max text-sm border-b border-white hover:border-opacity-70 transition-all"
            >
              {widget.link}
            </Link>
          </div>
          <div
            className={`text-3xl p-2 rounded-lg self-end bg-white bg-opacity-50 ${widget.iconColor}`}
          >
            <i className={`fas ${widget.icon}`}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Widget;

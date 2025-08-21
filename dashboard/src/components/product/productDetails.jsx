import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

/**
 * ProductCard (responsive) - with order status breakdown
 * - Shows aggregates: total orders, total quantity, total price (discount * qty)
 * - Shows counts for: Pending, Completed, Cancelled (handles 'canceled' spelling)
 * - Tailwind CSS used for styling; Font Awesome icons expected via CDN
 */

const ProductCard = ({ product, currencySymbol = "৳" }) => {
  const {
    _id,
    name = "Unnamed product",
    price = 0,
    discount = 0,
    primaryImage,
    orders = [],
  } = product || {};

  // Aggregate orders (memoized)
  const { orderCount, totalQuantity, totalPrice, statusCounts } = useMemo(() => {
    const orderCount = Array.isArray(orders) ? orders.length : 0;
    let totalQuantity = 0;
    let totalPrice = 0;
    const disc = Number(discount) || 0;

    const statusCounts = {
      pending: 0,
      completed: 0,
      cancelled: 0,
    };

    if (Array.isArray(orders)) {
      for (const o of orders) {
        const qty = Number(o?.quantity) || 0;
        totalQuantity += qty;
        totalPrice += disc * qty;

        const rawStatus = String(o?.status || "").trim().toLowerCase();
        if (rawStatus === "pending") statusCounts.pending += 1;
        else if (rawStatus === "completed" || rawStatus === "complete" || rawStatus === "done") statusCounts.completed += 1;
        else if (rawStatus === "cancelled" || rawStatus === "canceled" || rawStatus === "cancel") statusCounts.cancelled += 1;
      }
    }

    return { orderCount, totalQuantity, totalPrice, statusCounts };
  }, [orders, discount]);

  const formatCurrency = (val) => {
    const n = Number(val) || 0;
    return `${currencySymbol}${n}`;
  };

  const imageUrl = primaryImage ? String(primaryImage).trim() : null;

  return (
    <article className="bg-white/50 shadow-lg rounded-2xl p-4 sm:p-5 md:p-4 m-2">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="w-40 h-40 sm:w-36 sm:h-36 md:w-44 md:h-44 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="text-sm text-slate-500">No image</div>
          )}
        </div>

        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 truncate dark:text-white">{name}</h3>
            </div>

            <div className="flex-shrink-0 text-right">
              <div className="text-sm text-slate-400 line-through dark:text-white">{formatCurrency(price)}</div>
              <div className="text-lg md:text-xl font-bold text-green-500 dark:text-white">{formatCurrency(discount)}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Orders" value={orderCount} icon="fa-receipt" />
            <StatCard label="Pending" value={statusCounts.pending} icon="fa-hourglass-half" />
            <StatCard label="Completed" value={statusCounts.completed} icon="fa-circle-check" />
            <StatCard label="Cancelled" value={statusCounts.cancelled} icon="fa-circle-xmark" />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 p-3 bgGlass rounded-lg">
              <div className="text-xs text-slate-500 dark:text-white">Total Sell Amount</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{totalQuantity}</div>
            </div>

            <div className="flex-1 p-3 bgGlass rounded-lg">
              <div className="text-xs text-slate-500 dark:text-white">Total Sell Price</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(totalPrice)}</div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="flex items-center gap-3 p-3 bgGlass rounded-lg">
    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm">
      <i className={`fa-solid ${icon} fa-lg`} aria-hidden="true"></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-xs text-slate-500 dark:text-white">{label}</div>
      <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{value}</div>
    </div>
  </div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    primaryImage: PropTypes.string,
    orders: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        status: PropTypes.string,
      })
    ),
  }).isRequired,
  currencySymbol: PropTypes.string,
};

export default memo(ProductCard);

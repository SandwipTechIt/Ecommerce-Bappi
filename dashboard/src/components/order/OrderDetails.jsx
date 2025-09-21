import React, { useMemo, useRef } from "react";
import { formateDate } from "../../utiils/formateDate";
import { useReactToPrint } from "react-to-print";
import logoImge from "/logo.jpg";


function InvoiceDesign55x85({
  invoiceNo = "01234",
  items = [{ description: "Casual Shoe", qty: 1, price: 1900 }],
  name = "",
  address = "",
  mobile = "",
  phone = "01560044236",
  website = "comfortyzone.com",
  currency = "৳",
  courierFee = 0,
  subTotal = 0,
  couponDiscount = 0,
  size = "",
}) {

  const fmt = (n) => {
    const num = Number(n || 0);
    const body = Number.isInteger(num) ? String(num) : num.toFixed(2);
    return currency ? `${currency}${body}` : body;
  };

  return (
    <div
      className="relative bg-white text-gray-900 shadow"
      style={{
        width: "8.5in",
        height: "5.5in",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* CONTENT */}
      <div className="h-full px-10 pt-8 pb-24">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col ">
            <div className="text-right">
              <img className="w-48" src="/invoiceLogo.jpg" alt="" />
            </div>
            {/* Bill To */}
            <div className="mt-3">
              <div className="uppercase text-xs tracking-widest text-gray-500 font-semibold">
                INVOICE TO
              </div>
              <div className="mt-2 text-sm space-y-1">
                <div className="text-gray-800"> <span>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>  {name || ""}</div>
                <div className="text-gray-600"> <span>Address&nbsp;:</span> {address || ""}</div>
                <div className="text-gray-600"> <span>Mobile&nbsp;&nbsp;&nbsp;&nbsp;:</span> {mobile || ""}</div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-[28px] font-extrabold tracking-[0.2em] leading-none">
              INVOICE
            </h1>

            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <div className="uppercase tracking-wider">
                NO:&nbsp;
                <span className="font-medium text-gray-700">{invoiceNo}</span>
              </div>
              <div className="uppercase tracking-wider">
                DATE:&nbsp;
                <span className="font-medium text-gray-700">{formateDate(new Date())}</span>
              </div>
            </div>
          </div>

        </div>


        {/* Items */}
        <div className="mt-8">
          {/* Table header (orange strip) */}
          <div className="grid grid-cols-12 text-white text-[11px] font-semibold uppercase tracking-wider">
            <div className="col-span-6 bg-[#F2652A] px-4 py-2 rounded-tl-md">
              Item Description
            </div>
            <div className="col-span-2 bg-[#F2652A] px-4 py-2 text-right">
              Qty
            </div>
            <div className="col-span-2 bg-[#F2652A] px-4 py-2 text-right">
              Price
            </div>
            <div className="col-span-2 bg-[#F2652A] px-4 py-2 text-right rounded-tr-md">
              Total
            </div>
          </div>

          {/* Table body */}
          <div className="border border-gray-200 border-t-0 rounded-b-md">
            {items.map((it, idx) => {
              const line = Number(it?.qty || 0) * Number(it?.price || 0);
              return (
                <div
                  key={idx}
                  className="grid grid-cols-12 text-sm text-gray-800 border-t border-gray-200 first:border-t-0"
                >
                  <div className="col-span-6 px-4 py-3">
                    {it?.description || ""}
                  </div>
                  <div className="col-span-2 px-4 py-3 text-right">
                    {it?.qty}
                  </div>
                  <div className="col-span-2 px-4 py-3 text-right">
                    {fmt(it?.price)}
                  </div>
                  <div className="col-span-2 px-4 py-3 text-right">
                    {fmt(line)}
                  </div>
                </div>
              );
            })}

            <div
              className="grid grid-cols-12 text-sm text-gray-800 border-t border-gray-200 first:border-t-0"
            >
              <div className="col-span-6 px-4 py-3">
                Size
              </div>
              <div className="col-span-2 px-4 py-3 text-right">
              </div>
              <div className="col-span-2 px-4 py-3 text-right">
              </div>
              <div className="col-span-2 px-4 py-3 text-right">
                {size}
              </div>
            </div>

            <div
              className="grid grid-cols-12 text-sm text-gray-800 border-t border-gray-200 first:border-t-0"
            >
              <div className="col-span-6 px-4 py-3">
                Courier Fee
              </div>
              <div className="col-span-2 px-4 py-3 text-right">
              </div>
              <div className="col-span-2 px-4 py-3 text-right">
              </div>
              <div className="col-span-2 px-4 py-3 text-right">
                {courierFee}
              </div>
            </div>



            {couponDiscount > 0 &&
              <div
                className="grid grid-cols-12 text-sm text-gray-800 border-t border-gray-200 first:border-t-0"
              >
                <div className="col-span-6 px-4 py-3">
                  Coupon Discount
                </div>
                <div className="col-span-2 px-4 py-3 text-right">
                </div>
                <div className="col-span-2 px-4 py-3 text-right">
                </div>
                <div className="col-span-2 px-4 py-3 text-right">
                  {couponDiscount}
                </div>
              </div>
            }
          </div>

          {/* Subtotal */}
          <div className="grid grid-cols-12 mt-4">
            <div className="col-span-8"></div>
            <div className="col-span-2 text-sm font-semibold text-gray-800 uppercase tracking-wider px-4 py-2">
              Sub Total
            </div>
            <div className="col-span-2 text-right text-sm font-semibold text-gray-800 px-4 py-2">
              {fmt(subTotal)}
            </div>
          </div>

        </div>
        {/* Footer (light grey bar with three columns) */}
        <footer className="bg-gray-100 border-t border-gray-200">
          <div className="px-2 py-4">
            <div className="grid grid-cols-[2fr_1fr_1fr] text-[12px] text-gray-700">
              <div className="space-y-1">
                <div className="font-xs">Dhaka Office : Bankers Tower, 24 BCS Tower goli, Road no- 01, Laboni point, Bosila, Dhaka</div>
                <div className="font-xs">Chittagong Office : House 12, Gate 05, Block K, Halishahar H/E, Chattogram.</div>
              </div>

              <div className="flex flex-col items-center gap-2 justify-center">
                {/* Phone icon */}
                <div className="flex items-center gap-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.03-.24c1.12.37 2.33.57 3.56.57a1 1 0 011 1V21a1 1 0 01-1 1C10.3 22 2 13.7 2 3a1 1 0 011-1h3.49a1 1 0 011 1c0 1.23.2 2.44.57 3.56a1 1 0 01-.24 1.03l-2.2 2.2z" />
                  </svg>
                  <span className="font-medium">{phone}</span>
                </div>
                <div className="flex items-center justify-center gap-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.03-.24c1.12.37 2.33.57 3.56.57a1 1 0 011 1V21a1 1 0 01-1 1C10.3 22 2 13.7 2 3a1 1 0 011-1h3.49a1 1 0 011 1c0 1.23.2 2.44.57 3.56a1 1 0 01-.24 1.03l-2.2 2.2z" />
                  </svg>
                  <span className="font-medium">01820340331</span>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                {/* Globe icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.93 9h-3.13a15.68 15.68 0 00-1.1-5A8.02 8.02 0 0118.93 11zM12 4c.86 0 2.33 1.94 2.97 5H9.03C9.67 5.94 11.14 4 12 4zM7.3 7a15.68 15.68 0 00-1.1 5H3.07A8.02 8.02 0 017.3 7zM3.07 13h3.13a15.68 15.68 0 001.1 5 8.02 8.02 0 01-4.23-5zM12 20c-.86 0-2.33-1.94-2.97-5h5.94C14.33 18.06 12.86 20 12 20zm4.7-3a15.68 15.68 0 001.1-5h3.13a8.02 8.02 0 01-4.23 5z" />
                </svg>
                <span className="font-medium">{website}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}



export default function OrderDetails({ order }) {
  const { productID } = order;
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="bgGlass rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">
        Order #{order._id}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Card */}
        <div>
          <h3 className="font-bold mb-2 dark:text-gray-200">Product</h3>
          <img
            src={order.primaryImage}
            alt={productID.name}
            className="h-60 w-full md:h-80 md:w-full object-cover rounded"
          />
          <p className="mt-2 font-semibold text-lg dark:text-gray-200">
            {productID.name}
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            Price: ৳ {productID.discount}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Status: {productID.status}
          </p>
        </div>

        {/* Order Info */}
        <div className="dark:bg-gray-800 rounded-xl p-2 md:p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Customer Information
          </h3>

          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{order.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Phone:</span>
              <span>{order.number}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Address:</span>
              <span className="max-w-[200px] text-right">{order.address}</span>
            </div>

            <hr className="my-3 border-gray-200 dark:border-gray-600" />

            <div className="flex justify-between">
              <span className="font-medium">Size:</span>
              <span>{order.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span>{order.quantity}</span>
            </div>
            {
              order.courier && (
                <>
                  <div className="flex justify-between">
                    <span className="font-medium">Courier:</span>
                    <span>{order.courier.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Courier Fee:</span>
                    <span>{order.courier.fee}</span>
                  </div>
                </>
              )
            }

            {
              order.coupon && (
                <>
                  <div className="flex justify-between">
                    <span className="font-medium">Coupon:</span>
                    <span>{order.coupon.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Coupon Discount:</span>
                    <span>{order.coupon.discountAmount}</span>
                  </div>
                </>
              )
            }

            <div className="flex justify-between text-base font-semibold text-gray-900 dark:text-white">
              <span>Sub Total:</span>
              <span>৳ {Number(productID.discount) * Number(order.quantity)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-gray-900 dark:text-white">
              <span>Final Amount:</span>
              <span>৳ {order.totalAmount}</span>
            </div>

            <hr className="my-3 border-gray-200 dark:border-gray-600" />

            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold
          ${order.status === "completed"
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                    : order.status === "cancelled"
                      ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                  }`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Ordered on:</span>
              <span>{formateDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Note:</span>
              <span>{order.note || `" "`}</span>
            </div>

            {order.note && (
              <>
                <hr className="my-3 border-gray-200 dark:border-gray-600" />
                <div>
                  <span className="font-medium">Note:</span>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 italic">
                    {order.note}
                  </p>
                </div>
              </>
            )}


            <div className="hidden">
              <div ref={contentRef}>
                <InvoiceDesign55x85 invoiceNo={order._id} name={order.name} address={order.address} mobile={order.number} items={[{ description: order?.productID?.name, qty: order?.quantity, price: order?.productID?.discount }]} courierFee={order.courier?.fee} subTotal={order.totalAmount} couponDiscount={order.coupon?.discountAmount} size={order?.size} />
              </div>
            </div>

            {/* <button
              onClick={reactToPrintFn}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors font-medium"
            >
              Print
            </button> */}

            <div className="flex justify-between items-center w-full">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={reactToPrintFn}
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

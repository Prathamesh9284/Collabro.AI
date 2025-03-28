// "use client"

// import React, { useState } from "react";
// import "./Card.css"
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// // import { motion, AnimateSharedLayout } from "framer-motion";
// import { AnimatePresence, motion } from "framer-motion";
// import { UilTimes } from "@iconscout/react-unicons";
// import Chart from "react-apexcharts";

// // parent Card

// const Card = (props) => {
//   const [expanded, setExpanded] = useState(false);
//   return (
//     <AnimatePresence>
//       {expanded ? (
//         <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
//       ) : (
//         <CompactCard param={props} setExpanded={() => setExpanded(true)} />
//       )}
//     </AnimatePresence>



//   );
// };

// // Compact Card
// function CompactCard({ param, setExpanded }) {
//   const Png = param.png;
//   return (
//     <motion.div
//       className="CompactCard"
//       style={{
//         background: param.color.backGround,
//         boxShadow: param.color.boxShadow,
//       }}
//       layoutId="expandableCard"
//       onClick={setExpanded}
//     >
//       <div className="radialBar">
//         <CircularProgressbar
//           value={param.barValue}
//           text={`${param.barValue}%`}
//         />
//         <span>{param.title}</span>
//       </div>
//       <div className="detail">
//         <Png />
//         <span className="text_size_card">{param.value}</span>
//         <span>Last 24 hours</span>
//       </div>
//     </motion.div>
//   );
// }

// // Expanded Card
// function ExpandedCard({ param, setExpanded }) {
//   const data = {
//     options: {
//       chart: {
//         type: "area",
//         height: "auto",
//       },

//       dropShadow: {
//         enabled: false,
//         enabledOnSeries: undefined,
//         top: 0,
//         left: 0,
//         blur: 3,
//         color: "#000",
//         opacity: 0.35,
//       },

//       fill: {
//         colors: ["#fff"],
//         type: "gradient",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "smooth",
//         colors: ["white"],
//       },
//       tooltip: {
//         x: {
//           format: "dd/MM/yy HH:mm",
//         },
//       },
//       grid: {
//         show: true,
//       },
//       xaxis: {
//         type: "datetime",
//         categories: [
//           "2018-09-19T00:00:00.000Z",
//           "2018-09-19T01:30:00.000Z",
//           "2018-09-19T02:30:00.000Z",
//           "2018-09-19T03:30:00.000Z",
//           "2018-09-19T04:30:00.000Z",
//           "2018-09-19T05:30:00.000Z",
//           "2018-09-19T06:30:00.000Z",
//         ],
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="ExpandedCard"
//       style={{
//         background: param.color.backGround,
//         boxShadow: param.color.boxShadow,
//       }}
//       // layoutId="expandableCard"
//       layoutId={`expandableCard-${param.index}`} // Use unique layoutId
//     >
//       <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
//         <UilTimes onClick={setExpanded} />
//       </div>
//         <span>{param.title}</span>
//       <div className="chartContainer">
//         <Chart options={data.options} series={param.series} type="area" />
//       </div>
//       <span>Last 24 hours</span>
//     </motion.div>
//   );
// }

// export default Card;


// Card.jsx
"use client";
import React from "react";

const Card = ({ title, color, barValue, value, png, series, index }) => {
  return (
    <div className="p-4 rounded-lg shadow-md" style={{ background: color.backGround, boxShadow: color.boxShadow }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <h4 className="text-white text-2xl font-bold">{value}</h4>
        </div>
        <div className="w-16 h-16">
          {png}
        </div>
      </div>
      <div className="mt-4">
        {/* Example: Circular Progress Bar */}
        <div style={{ width: "50px", height: "50px" }}>
          {/* Replace with your preferred progress bar */}
          {barValue}%
        </div>
      </div>
    </div>
  );
};

export default Card;
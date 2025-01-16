// "use client"
// import React from "react";
// import "./Cards.css";
// import { cardsData } from "@/data/Data";

// import Card from "../Card/Card";

// const Cards = () => {
    
//   return (
//     <div className="Cards">
//         {console.log(cardsData)}
//       {cardsData.map((card, index) => {
//         return (
//           <div className="parentContainer" key={index}>
//             <Card
//               title={card.title}
//               color={card.color}
//               barValue={card.barValue}
//               value={card.value}
//               png={card.png}
//               series={card.series}
//               index = {index}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Cards;


// "use client";
// import React from "react";
// import "./Cards.css";
// import Card from "../Card/Card";

// const Cards = ({ cardsData }) => {
//   if (!cardsData || cardsData.length === 0) {
//     return (
//       <div className="flex justify-center items-center w-full">
//         <p className="text-gray-500">No data available to display.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="Cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {cardsData.map((card, index) => (
//         <div className="parentContainer shadow-lg rounded-lg" key={index}>
//           <Card
//             title={card.title}
//             color={card.color}
//             barValue={card.barValue}
//             value={card.value}
//             png={card.png}
//             series={card.series}
//             index={index}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Cards;


// Cards.jsx
"use client";
import React from "react";
import "./Cards.css";
import Card from "../Card/Card"; // Correct for default export

const Cards = ({ cardsData }) => {
  if (!cardsData || cardsData.length === 0) {
    return (
      <div className="flex justify-center items-center w-full">
        <p className="text-gray-500">No data available to display.</p>
      </div>
    );
  }

  return (
    <div className="Cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cardsData.map((card, index) => (
        <div className="parentContainer shadow-lg rounded-lg" key={index}>
          <Card
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
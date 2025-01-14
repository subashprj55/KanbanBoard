import * as React from "react";
const KanbanBoard = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={600}
    height={400}
    fill="none"
    {...props}
  >
    <path fill="#F3F4F6" d="M0 0h600v400H0z" />
    <rect
      width={160}
      height={320}
      x={40}
      y={40}
      fill="#FFF"
      stroke="#E5E7EB"
      strokeWidth={2}
      rx={8}
    />
    <rect
      width={160}
      height={320}
      x={220}
      y={40}
      fill="#FFF"
      stroke="#E5E7EB"
      strokeWidth={2}
      rx={8}
    />
    <rect
      width={160}
      height={320}
      x={400}
      y={40}
      fill="#FFF"
      stroke="#E5E7EB"
      strokeWidth={2}
      rx={8}
    />
    <rect width={120} height={80} x={60} y={60} fill="#DBEAFE" rx={4} />
    <rect width={120} height={80} x={60} y={160} fill="#DBEAFE" rx={4} />
    <rect width={120} height={80} x={60} y={260} fill="#DBEAFE" rx={4} />
    <rect width={120} height={80} x={240} y={60} fill="#FEE2E2" rx={4} />
    <rect width={120} height={80} x={240} y={160} fill="#FEE2E2" rx={4} />
    <rect width={120} height={80} x={420} y={60} fill="#D1FAE5" rx={4} />
    <rect width={120} height={80} x={420} y={160} fill="#D1FAE5" rx={4} />
    <text x={100} y={30} fill="#4B5563" fontFamily="Arial" fontSize={14}>
      {"To Do"}
    </text>
    <text x={280} y={30} fill="#4B5563" fontFamily="Arial" fontSize={14}>
      {"In Progress"}
    </text>
    <text x={460} y={30} fill="#4B5563" fontFamily="Arial" fontSize={14}>
      {"Done"}
    </text>
  </svg>
);
export default KanbanBoard;

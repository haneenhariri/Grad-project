import React from 'react';

export interface InfoCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
}

export default function InfoCard({title, value, icon, bgColor, iconBgColor}: InfoCardProps) {
  return (
    <div className={`p-4 shadow-md ${bgColor} transition-all duration-300 hover:shadow-lg`}>
      <div className="flex items-center gap-6">
        <div className={` h-12 w-12  p-3 ${iconBgColor}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold">{value}</h2>
          <p className="text-sm opacity-80">{title}</p>
        </div>
      </div>
    </div>
  );
}

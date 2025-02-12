import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, type LucideIcon } from 'lucide-react';

export interface CardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  description?: string;
}

export function Card({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description
}: CardProps) {
  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const trendBg = isPositive ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium ${trendBg} ${trendColor}`}>
          <TrendIcon className="h-4 w-4" />
          {change}
        </div>
      </div>
      {description && (
        <p className="mt-4 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
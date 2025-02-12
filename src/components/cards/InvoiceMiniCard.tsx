import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  FileText,
  ClipboardCheck,
  Send,
  DollarSign,
  Download,
  Share2,
  Calendar
} from 'lucide-react';

interface InvoiceMiniCardProps {
  id: string;
  invoiceNumber: string;
  status: 'DRAFT' | 'PENDING' | 'ISSUED' | 'PAID' | 'VOID' | 'CANCELLED';
  type: 'SUBSCRIPTION' | 'USAGE' | 'ADJUSTMENT' | 'CREDIT_NOTE';
  total: number;
  currency: string;
  dueDate?: string;
  companyName: string;
  onClick?: () => void;
  onMoveToPending?: () => void;
  onIssue?: () => void;
  onRecordPayment?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

const statusConfig = {
  DRAFT: { color: 'warning' as const },
  PENDING: { color: 'info' as const },
  ISSUED: { color: 'primary' as const },
  PAID: { color: 'success' as const },
  VOID: { color: 'default' as const },
  CANCELLED: { color: 'error' as const }
};

const typeConfig = {
  SUBSCRIPTION: { color: 'primary' as const },
  USAGE: { color: 'info' as const },
  ADJUSTMENT: { color: 'warning' as const },
  CREDIT_NOTE: { color: 'error' as const }
};

export function InvoiceMiniCard({
  invoiceNumber,
  status,
  type,
  total,
  currency,
  dueDate,
  companyName,
  onClick,
  onMoveToPending,
  onIssue,
  onRecordPayment,
  onDownload,
  onShare
}: InvoiceMiniCardProps) {
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(total);

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {invoiceNumber}
              </h3>
              <p className="text-xs text-gray-500 truncate">{companyName}</p>
            </div>
          </div>

          <div className="mt-2 flex items-center space-x-2">
            <Badge 
              variant={statusConfig[status].color}
              size="sm"
            >
              {status.toLowerCase()}
            </Badge>
            <Badge 
              variant={typeConfig[type].color}
              size="sm"
            >
              {type.toLowerCase().replace('_', ' ')}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <div className="text-sm font-medium text-gray-900">
            {formattedTotal}
          </div>
          {dueDate && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              <span>Due {dueDate}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end space-x-2">
        {/* State Management Actions */}
        {status === 'DRAFT' && onMoveToPending && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onMoveToPending();
            }}
          >
            <ClipboardCheck className="w-4 h-4 mr-1" />
            Move to Pending
          </Button>
        )}
        
        {status === 'PENDING' && onIssue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onIssue();
            }}
          >
            <Send className="w-4 h-4 mr-1" />
            Issue
          </Button>
        )}
        
        {status === 'ISSUED' && onRecordPayment && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRecordPayment();
            }}
          >
            <DollarSign className="w-4 h-4 mr-1" />
            Record Payment
          </Button>
        )}

        {/* Document Actions */}
        {status !== 'DRAFT' && (
          <>
            {onDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload();
                }}
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
            
            {onShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
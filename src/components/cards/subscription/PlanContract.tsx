import React from 'react';
import { Clock, FileText, CreditCard } from 'lucide-react';

interface PlanContractProps {
  contractTerms: {
    minimumTerm: number;
    contractRequired: boolean;
    autoRenew: boolean;
    cancellationTerms?: {
      noticePeriod: number;
      earlyTerminationFee: number;
    };
  };
}

export function PlanContract({ contractTerms }: PlanContractProps) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-900 mb-2">Contract Terms</div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>Minimum term: {contractTerms.minimumTerm} months</span>
        </div>
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          <span>Contract {contractTerms.contractRequired ? 'required' : 'optional'}</span>
        </div>
        <div className="flex items-center">
          <CreditCard className="w-4 h-4 mr-2" />
          <span>Auto-renew: {contractTerms.autoRenew ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Badge } from '../../Badge';
import { Box, Lightbulb, FileCode, Eye, Code, TestTube, CheckCircle2 } from 'lucide-react';

type ApplicationStatus = 'MEMORY' | 'BLUEPRINT' | 'VISUAL_PRD' | 'DURING_DEVELOPMENT' | 'UNDER_TESTED' | 'DEVELOPMENT_COMPLETE';

interface AppHeaderProps {
  title: string;
  description: string;
  status: ApplicationStatus;
  currentVersion?: string;
}

const statusConfig = {
  MEMORY: { color: 'warning' as const, icon: Lightbulb, label: 'Memory' },
  BLUEPRINT: { color: 'info' as const, icon: FileCode, label: 'Blueprint' },
  VISUAL_PRD: { color: 'info' as const, icon: Eye, label: 'Visual PRD' },
  DURING_DEVELOPMENT: { color: 'info' as const, icon: Code, label: 'In Development' },
  UNDER_TESTED: { color: 'warning' as const, icon: TestTube, label: 'Testing' },
  DEVELOPMENT_COMPLETE: { color: 'success' as const, icon: CheckCircle2, label: 'Complete' }
};

export function AppHeader({ title, description, status, currentVersion }: AppHeaderProps) {
  const StatusIcon = statusConfig[status].icon;

  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Box className="w-12 h-12 text-gray-400" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge 
          variant={statusConfig[status].color}
          icon={<StatusIcon className="w-4 h-4" />}
        >
          {statusConfig[status].label}
        </Badge>
        {currentVersion && (
          <Badge variant="default">
            v{currentVersion}
          </Badge>
        )}
      </div>
    </div>
  );
}
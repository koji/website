import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

import type { ReactNode } from 'react';

interface ProjectLinkProps {
  link: string;
  name?: string;
}

export const ProjectLink = ({ link, name }: ProjectLinkProps): ReactNode => (
  <div className="pt-2">
    <Button
      variant="outline"
      size="sm"
      className="text-primary hover:text-primary/80 border-primary"
      onClick={() => window.open(link, '_blank', 'noopener')}
      data-umami-event="outbound-project"
      data-umami-event-project={name}
    >
      <ExternalLink className="h-4 w-4 mr-2" />
      View Project
    </Button>
  </div>
);

import React from 'react';
import { Book, Download, FileText, Image, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Material {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'image' | 'doc';
  size: string;
  course: string;
  path: string;
}

const materials: Material[] = [
  { id: 1, title: 'Week 5 Lecture Notes', type: 'pdf', size: '2.4 MB', course: 'Math 101',path:'/materials/DL-UNIT-3-Notes' }
];

const MaterialsWidget: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'doc':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  const getIconBackground = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-500/20 text-red-500';
      case 'video':
        return 'bg-blue-500/20 text-blue-500';
      case 'image':
        return 'bg-green-500/20 text-green-500';
      case 'doc':
        return 'bg-purple-500/20 text-purple-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };
  
  return (
    <div className="dashboard-card">
      <div className="flex items-center gap-2 mb-4">
        <Book className="h-5 w-5 text-align-accent" />
        <h3 className="font-bold text-lg">Saved Materials</h3>
      </div>
      
      <div className="space-y-2">
        {materials.map((material) => (
          <div
            key={material.id}
            className="p-3 rounded-lg bg-align/50 hover:bg-align-accent/10 transition-colors flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${getIconBackground(material.type)}`}>
                {getIcon(material.type)}
              </div>
              <div>
                <p className="font-medium text-sm">{material.title}</p>
                <div className="flex items-center gap-2 text-xs text-align-muted">
                  <span>{material.course}</span>
                  <span>•</span>
                  <span>{material.size}</span>
                </div>
              </div>
            </div>
            <a
              href={material.path}
              download
              className="text-align-muted hover:text-white"
            >
              <Download className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-4 bg-align-secondary border-align-secondary hover:bg-align-accent/20">
        Browse All Materials
      </Button>
    </div>
  );
};

export default MaterialsWidget;

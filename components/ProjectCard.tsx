
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative overflow-hidden bg-zinc-900 cursor-pointer aspect-video md:aspect-[4/3] lg:aspect-video">
      <img 
        src={project.thumbnail} 
        alt={project.title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-2">{project.category} / {project.year}</span>
        <h3 className="text-3xl font-syncopate font-bold mb-4">{project.title}</h3>
        <p className="text-zinc-300 text-sm max-w-md mb-6 line-clamp-2">{project.description}</p>
        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group-hover:translate-x-2 transition-transform">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

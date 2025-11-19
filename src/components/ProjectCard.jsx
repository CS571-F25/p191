import { Card as BootstrapCard } from 'react-bootstrap';

export default function ProjectCard({ title, description, image, technologies, onViewProject }) {
    return (
        <BootstrapCard className="h-100 shadow-sm">
            <BootstrapCard.Img 
                variant="top" 
                src={image} 
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <BootstrapCard.Body className="d-flex flex-column">
                <BootstrapCard.Title>{title}</BootstrapCard.Title>
                <BootstrapCard.Text className="flex-grow-1">
                    {description}
                </BootstrapCard.Text>
                <div className="mb-3">
                    {technologies && technologies.map((tech, index) => (
                        <span 
                            key={index} 
                            className="badge bg-primary me-1 mb-1"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                {onViewProject && (
                    <button 
                        className="btn btn-outline-primary mt-auto"
                        onClick={onViewProject}
                    >
                        View Project
                    </button>
                )}
            </BootstrapCard.Body>
        </BootstrapCard>
    );
}
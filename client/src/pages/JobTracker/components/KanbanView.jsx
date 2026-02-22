import React, { useMemo } from 'react';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Briefcase, Calendar, Building, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import './KanbanView.css';

const COLUMNS = [
    { id: 'Wishlist', title: 'Wishlist', color: '#6b7280' },
    { id: 'Applied', title: 'Applied', color: '#3b82f6' },
    { id: 'Interview Scheduled', title: 'Interview Scheduled', color: '#f59e0b' },
    { id: 'Interview', title: 'Interviewing', color: '#8b5cf6' },
    { id: 'Offer', title: 'Offer', color: '#10b981' },
    { id: 'Accepted', title: 'Accepted', color: '#059669' },
    { id: 'Rejected', title: 'Rejected', color: '#ef4444' }
];

const JobCard = ({ job, isOverlay }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: job.id,
        data: {
            type: 'Job',
            job
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`kanban-card ${isOverlay ? 'is-overlay' : ''}`}
        >
            <div className="card-header">
                <div className="card-company">
                    <Building size={14} />
                    {job.company}
                </div>
                {job.job_url && (
                    <a href={job.job_url} target="_blank" rel="noopener noreferrer" className="card-link" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={14} />
                    </a>
                )}
            </div>
            <h4 className="card-role">{job.role}</h4>
            <div className="card-meta">
                {job.location && (
                    <div className="meta-item">
                        <MapPin size={12} />
                        {job.location}
                    </div>
                )}
                {job.salary_range && (
                    <div className="meta-item">
                        <DollarSign size={12} />
                        {job.salary_range}
                    </div>
                )}
            </div>
            <div className="card-footer">
                <span className="card-date">
                    <Calendar size={12} />
                    {job.applied_at ? new Date(job.applied_at).toLocaleDateString() : 'N/A'}
                </span>
            </div>
        </div>
    );
};

const KanbanColumn = ({ column, jobs }) => {
    const { setNodeRef } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            columnId: column.id
        }
    });

    return (
        <div className="kanban-column">
            <div className="column-header" style={{ borderTop: `4px solid ${column.color}` }}>
                <h3>{column.title}</h3>
                <span className="count">{jobs.length}</span>
            </div>
            <div ref={setNodeRef} className="column-content">
                <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};

function KanbanView({ jobs, onStatusChange }) {
    const [activeId, setActiveId] = React.useState(null);
    const activeJob = useMemo(() => jobs.find(j => j.id === activeId), [jobs, activeId]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const groupedJobs = useMemo(() => {
        return COLUMNS.reduce((acc, col) => {
            acc[col.id] = jobs.filter(j => j.status === col.id);
            return acc;
        }, {});
    }, [jobs]);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        // We could handle local reordering here if needed
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const activeJob = jobs.find(j => j.id === activeId);
        const overItem = over.data.current;

        if (!activeJob) return;

        let destinationStatus = activeJob.status;

        // Handle dropping over a column
        if (overItem?.type === 'Column') {
            destinationStatus = overItem.columnId;
        }

        // Handle dropping over another card
        if (overItem?.type === 'Job') {
            destinationStatus = overItem.job.status;
        }

        if (destinationStatus !== activeJob.status) {
            onStatusChange(activeId, destinationStatus);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="kanban-board">
                {COLUMNS.map(column => (
                    <KanbanColumn
                        key={column.id}
                        column={column}
                        jobs={groupedJobs[column.id] || []}
                    />
                ))}
            </div>

            <DragOverlay dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                    styles: {
                        active: {
                            opacity: '0.5',
                        },
                    },
                }),
            }}>
                {activeId ? <JobCard job={activeJob} isOverlay /> : null}
            </DragOverlay>
        </DndContext>
    );
}

export default KanbanView;

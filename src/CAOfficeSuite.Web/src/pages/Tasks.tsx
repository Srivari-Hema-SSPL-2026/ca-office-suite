import { useEffect, useState } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCalendarAlt,
  faUser,
  faBuilding,
  faClipboardList,
  faExclamationTriangle,
  faClock,
  faCheckCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../store/useAuth';
import { taskService } from '../services/api';
import type { Task, TaskStatus } from '../types';
import { DataGrid, type Column } from '../components/common';
import './Tasks.css';

export function Tasks() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (id) {
    return <TaskDetail taskId={id} />;
  }

  return <TaskList />;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await taskService.getTasks();
      setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return faCheckCircle;
      case 'overdue':
        return faExclamationTriangle;
      case 'in-progress':
        return faSpinner;
      default:
        return faClock;
    }
  };

  // Define columns for the DataGrid
  const columns: Column<Task>[] = [
    {
      id: 'title',
      label: 'Task Title',
      accessor: 'title',
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <Link to={`/tasks/${row.id}`} className="task-title-link">
          {value}
        </Link>
      ),
    },
    {
      id: 'type',
      label: 'Type',
      accessor: 'type',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'GST', value: 'GST' },
        { label: 'ITR', value: 'ITR' },
        { label: 'TDS', value: 'TDS' },
        { label: 'Audit', value: 'Audit' },
        { label: 'ROC', value: 'ROC' },
        { label: 'Other', value: 'Other' },
      ],
      render: value => <span className={`task-type-badge ${value.toLowerCase()}`}>{value}</span>,
    },
    {
      id: 'clientName',
      label: 'Client',
      accessor: 'clientName',
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <Link to={`/clients/${row.clientId}`} className="client-link">
          <FontAwesomeIcon icon={faBuilding} /> {value}
        </Link>
      ),
    },
    {
      id: 'assignee',
      label: 'Assignee',
      accessor: 'assignee',
      sortable: true,
      filterable: true,
      render: value => (
        <span>
          <FontAwesomeIcon icon={faUser} /> {value}
        </span>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Overdue', value: 'overdue' },
      ],
      render: (value, row) => (
        <span className={`status-badge ${row.status}`}>
          <FontAwesomeIcon icon={getStatusIcon(row.status)} />
          {value.replace('-', ' ')}
        </span>
      ),
    },
    {
      id: 'priority',
      label: 'Priority',
      accessor: 'priority',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
      render: value => <span className={`priority-badge ${value}`}>{value}</span>,
    },
    {
      id: 'dueDate',
      label: 'Due Date',
      accessor: 'dueDate',
      sortable: true,
      filterable: true,
      filterType: 'date',
      render: value => (
        <span>
          <FontAwesomeIcon icon={faCalendarAlt} /> {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'description',
      label: 'Description',
      accessor: 'description',
      sortable: false,
      filterable: true,
      visible: false, // Hidden by default
      render: value => value || '-',
    },
  ];

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Tasks Management</h1>
        <p>Track and manage compliance tasks</p>
      </div>

      <DataGrid
        data={tasks}
        columns={columns}
        loading={loading}
        emptyMessage="No tasks found"
        storageKey="tasks"
      />
    </div>
  );
}

function TaskDetail({ taskId }: { taskId: string }) {
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const data = await taskService.getTaskById(taskId);
      setTask(data ?? null);
      setLoading(false);
    };
    fetchTask();
  }, [taskId]);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return faCheckCircle;
      case 'overdue':
        return faExclamationTriangle;
      case 'in-progress':
        return faSpinner;
      default:
        return faClock;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading task details...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="not-found">
        <h2>Task Not Found</h2>
        <p>The requested task could not be found.</p>
        <button onClick={() => navigate('/tasks')} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="task-detail">
      <button onClick={() => navigate('/tasks')} className="back-link">
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Tasks
      </button>

      <div className="task-detail-header">
        <div className="header-top">
          <span className={`task-type-badge ${task.type.toLowerCase()}`}>{task.type}</span>
          <span className={`priority-badge ${task.priority}`}>{task.priority} priority</span>
        </div>
        <h1>{task.title}</h1>
        <span className={`status-badge large ${task.status}`}>
          <FontAwesomeIcon icon={getStatusIcon(task.status)} />
          {task.status.replace('-', ' ')}
        </span>
      </div>

      <div className="task-detail-grid">
        <div className="detail-card">
          <h2>
            <FontAwesomeIcon icon={faClipboardList} />
            Description
          </h2>
          <p className="description-text">{task.description}</p>
        </div>

        <div className="detail-card">
          <h2>Details</h2>
          <div className="detail-list">
            <div className="detail-item">
              <FontAwesomeIcon icon={faBuilding} />
              <div className="detail-content">
                <span className="detail-label">Client</span>
                <Link to={`/clients/${task.clientId}`} className="detail-value link">
                  {task.clientName}
                </Link>
              </div>
            </div>

            <div className="detail-item">
              <FontAwesomeIcon icon={faUser} />
              <div className="detail-content">
                <span className="detail-label">Assignee</span>
                <span className="detail-value">{task.assignee}</span>
              </div>
            </div>

            <div className="detail-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <div className="detail-content">
                <span className="detail-label">Due Date</span>
                <span className="detail-value">{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="detail-item">
              <FontAwesomeIcon icon={faClock} />
              <div className="detail-content">
                <span className="detail-label">Created</span>
                <span className="detail-value">{new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-card activity-card">
        <h2>Activity Log</h2>
        <div className="activity-placeholder">
          <p>Activity log will be available when connected to backend.</p>
        </div>
      </div>
    </div>
  );
}

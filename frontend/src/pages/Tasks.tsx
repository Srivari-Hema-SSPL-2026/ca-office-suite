import { useEffect, useState, useMemo } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await taskService.getTasks();
      setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(query) ||
          t.clientName.toLowerCase().includes(query) ||
          t.assignee.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      result = result.filter(t => t.type === typeFilter);
    }

    if (priorityFilter !== 'all') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    return result;
  }, [searchQuery, statusFilter, typeFilter, priorityFilter, tasks]);

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
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Tasks Management</h1>
        <p>Track and manage compliance tasks</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            aria-label="Filter by type"
          >
            <option value="all">All Types</option>
            <option value="GST">GST</option>
            <option value="ITR">ITR</option>
            <option value="TDS">TDS</option>
            <option value="Audit">Audit</option>
            <option value="ROC">ROC</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <Link to={`/tasks/${task.id}`} key={task.id} className={`task-card ${task.status}`}>
              <div className="task-card-header">
                <span className={`task-type-badge ${task.type.toLowerCase()}`}>{task.type}</span>
                <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
              </div>

              <h3 className="task-card-title">{task.title}</h3>

              <div className="task-card-meta">
                <div className="meta-item">
                  <FontAwesomeIcon icon={faBuilding} />
                  <span>{task.clientName}</span>
                </div>
                <div className="meta-item">
                  <FontAwesomeIcon icon={faUser} />
                  <span>{task.assignee}</span>
                </div>
                <div className="meta-item">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="task-card-footer">
                <span className={`status-badge ${task.status}`}>
                  <FontAwesomeIcon icon={getStatusIcon(task.status)} />
                  {task.status.replace('-', ' ')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
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

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faTasks,
  faExclamationTriangle,
  faCheckCircle,
  faClock,
  faArrowRight,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../store/useAuth';
import { clientService, taskService } from '../services/api';
import type { Client, Task } from '../types';
import './Home.css';

export function Home() {
  const { isAuthenticated, user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        const [clientData, taskData] = await Promise.all([
          clientService.getClients(),
          taskService.getTasks(),
        ]);
        setClients(clientData);
        setTasks(taskData);
      }
      setLoading(false);
    };
    fetchData();
  }, [isAuthenticated]);

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    overdueTasks: tasks.filter(t => t.status === 'overdue').length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
  };

  const upcomingDeadlines = tasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  if (!isAuthenticated) {
    return (
      <div className="home-guest">
        <div className="hero-section">
          <h1>Welcome to CA Office Suite</h1>
          <p>
            A modern, scalable office management platform designed for Chartered
            Accountants and tax professionals.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">
              Get Started
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/help" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>

        <div className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FontAwesomeIcon icon={faUsers} className="feature-icon" />
              <h3>Client Management</h3>
              <p>Maintain comprehensive client profiles with all necessary details.</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faTasks} className="feature-icon" />
              <h3>Task Tracking</h3>
              <p>Plan, assign, and track compliance work efficiently.</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faCalendarAlt} className="feature-icon" />
              <h3>Deadline Management</h3>
              <p>Never miss a filing deadline with smart reminders.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="home-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here&apos;s an overview of your practice</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon clients">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.totalClients}</span>
            <span className="stat-label">Total Clients</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.pendingTasks}</span>
            <span className="stat-label">Pending Tasks</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon overdue">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.overdueTasks}</span>
            <span className="stat-label">Overdue Tasks</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="quick-links-section">
          <h2>Quick Actions</h2>
          <div className="quick-links">
            <Link to="/clients" className="quick-link-card">
              <FontAwesomeIcon icon={faUsers} />
              <span>View Clients</span>
              <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
            <Link to="/tasks" className="quick-link-card">
              <FontAwesomeIcon icon={faTasks} />
              <span>Manage Tasks</span>
              <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
          </div>
        </div>

        <div className="deadlines-section">
          <h2>Upcoming Deadlines</h2>
          {upcomingDeadlines.length > 0 ? (
            <div className="deadlines-list">
              {upcomingDeadlines.map(task => (
                <Link
                  to={`/tasks/${task.id}`}
                  key={task.id}
                  className={`deadline-item ${task.status}`}
                >
                  <div className="deadline-info">
                    <span className="deadline-title">{task.title}</span>
                    <span className="deadline-client">{task.clientName}</span>
                  </div>
                  <div className="deadline-date">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="no-deadlines">No upcoming deadlines</p>
          )}
        </div>
      </div>
    </div>
  );
}

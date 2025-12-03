import { useEffect, useState, useMemo } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faArrowLeft,
  faCheckCircle,
  faTimesCircle,
  faCalendarAlt,
  faTasks,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../store/useAuth';
import { clientService, taskService } from '../services/api';
import type { Client, Task } from '../types';
import './Clients.css';

export function Clients() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (id) {
    return <ClientDetail clientId={id} />;
  }

  return <ClientList />;
}

function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await clientService.getClients();
      setClients(data);
      setLoading(false);
    };
    fetchClients();
  }, []);

  const filteredClients = useMemo(() => {
    let result = clients;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          c.name.toLowerCase().includes(query) ||
          c.pan.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter);
    }

    return result;
  }, [searchQuery, statusFilter, clients]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading clients...</p>
      </div>
    );
  }

  return (
    <div className="clients-page">
      <div className="page-header">
        <h1>Client Control</h1>
        <p>Manage your client portfolio</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="status-filter"
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {filteredClients.length === 0 ? (
        <div className="empty-state">
          <p>No clients found</p>
        </div>
      ) : (
        <div className="clients-table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>PAN / GSTIN</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Next Due</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td>
                    <Link to={`/clients/${client.id}`} className="client-name-link">
                      {client.name}
                    </Link>
                  </td>
                  <td>
                    <div className="pan-gstin">
                      <span className="pan">{client.pan}</span>
                      {client.gstin && <span className="gstin">{client.gstin}</span>}
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <span>{client.email}</span>
                      <span>{client.phone}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${client.status}`}>
                      <FontAwesomeIcon
                        icon={client.status === 'active' ? faCheckCircle : faTimesCircle}
                      />
                      {client.status}
                    </span>
                  </td>
                  <td>
                    {client.nextDueDate ? (
                      <span className="due-date">
                        {new Date(client.nextDueDate).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="no-due">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile card view */}
      <div className="clients-cards">
        {filteredClients.map(client => (
          <Link to={`/clients/${client.id}`} key={client.id} className="client-card">
            <div className="client-card-header">
              <h3>{client.name}</h3>
              <span className={`status-badge ${client.status}`}>
                {client.status}
              </span>
            </div>
            <div className="client-card-body">
              <div className="card-row">
                <FontAwesomeIcon icon={faIdCard} />
                <span>{client.pan}</span>
              </div>
              <div className="card-row">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{client.email}</span>
              </div>
              <div className="card-row">
                <FontAwesomeIcon icon={faPhone} />
                <span>{client.phone}</span>
              </div>
              {client.nextDueDate && (
                <div className="card-row">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>Due: {new Date(client.nextDueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ClientDetail({ clientId }: { clientId: string }) {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [clientData, taskData] = await Promise.all([
        clientService.getClientById(clientId),
        taskService.getTasksByClient(clientId),
      ]);
      setClient(clientData ?? null);
      setTasks(taskData);
      setLoading(false);
    };
    fetchData();
  }, [clientId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading client details...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="not-found">
        <h2>Client Not Found</h2>
        <p>The requested client could not be found.</p>
        <button onClick={() => navigate('/clients')} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Clients
        </button>
      </div>
    );
  }

  return (
    <div className="client-detail">
      <button onClick={() => navigate('/clients')} className="back-link">
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Clients
      </button>

      <div className="detail-header">
        <div className="detail-avatar">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="detail-title">
          <h1>{client.name}</h1>
          <span className={`status-badge ${client.status}`}>
            <FontAwesomeIcon
              icon={client.status === 'active' ? faCheckCircle : faTimesCircle}
            />
            {client.status}
          </span>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-section">
          <h2>Contact Information</h2>
          <div className="info-list">
            <div className="info-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>{client.email}</span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faPhone} />
              <span>{client.phone}</span>
            </div>
            {client.address && (
              <div className="info-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>{client.address}</span>
              </div>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h2>Identification</h2>
          <div className="info-list">
            <div className="info-item">
              <strong>PAN:</strong>
              <span>{client.pan}</span>
            </div>
            {client.gstin && (
              <div className="info-item">
                <strong>GSTIN:</strong>
                <span>{client.gstin}</span>
              </div>
            )}
            {client.nextDueDate && (
              <div className="info-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>Next Due: {new Date(client.nextDueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="detail-section tasks-section">
        <h2>
          <FontAwesomeIcon icon={faTasks} />
          Related Tasks ({tasks.length})
        </h2>
        {tasks.length > 0 ? (
          <div className="tasks-list">
            {tasks.map(task => (
              <Link to={`/tasks/${task.id}`} key={task.id} className="task-item">
                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  <span className={`task-type ${task.type.toLowerCase()}`}>{task.type}</span>
                </div>
                <div className="task-meta">
                  <span className={`task-status ${task.status}`}>{task.status}</span>
                  <span className="task-due">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="no-tasks">No tasks associated with this client</p>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faArrowLeft,
  faCheckCircle,
  faTimesCircle,
  faCalendarAlt,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../store/useAuth';
import { clientService, taskService } from '../services/api';
import type { Client, Task } from '../types';
import { DataGrid, type Column } from '../components/common';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await clientService.getClients();
      setClients(data);
      setLoading(false);
    };
    fetchClients();
  }, []);

  // Define columns for the DataGrid
  const columns: Column<Client>[] = [
    {
      id: 'name',
      label: 'Client Name',
      accessor: 'name',
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <Link to={`/clients/${row.id}`} className="client-name-link">
          {value}
        </Link>
      ),
    },
    {
      id: 'pan',
      label: 'PAN',
      accessor: 'pan',
      sortable: true,
      filterable: true,
    },
    {
      id: 'gstin',
      label: 'GSTIN',
      accessor: 'gstin',
      sortable: true,
      filterable: true,
      visible: true,
      render: value => value || '-',
    },
    {
      id: 'email',
      label: 'Email',
      accessor: 'email',
      sortable: true,
      filterable: true,
    },
    {
      id: 'phone',
      label: 'Phone',
      accessor: 'phone',
      sortable: true,
      filterable: true,
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      render: (value, row) => (
        <span className={`status-badge ${row.status}`}>
          <FontAwesomeIcon icon={row.status === 'active' ? faCheckCircle : faTimesCircle} />
          {value}
        </span>
      ),
    },
    {
      id: 'nextDueDate',
      label: 'Next Due Date',
      accessor: 'nextDueDate',
      sortable: true,
      filterable: true,
      filterType: 'date',
      render: value =>
        value ? (
          <span className="due-date">{new Date(value).toLocaleDateString()}</span>
        ) : (
          <span className="no-due">-</span>
        ),
    },
    {
      id: 'address',
      label: 'Address',
      accessor: 'address',
      sortable: true,
      filterable: true,
      visible: false, // Hidden by default
      render: value => value || '-',
    },
  ];

  return (
    <div className="clients-page">
      <div className="page-header">
        <h1>Client Control</h1>
        <p>Manage your client portfolio</p>
      </div>

      <DataGrid
        data={clients}
        columns={columns}
        loading={loading}
        emptyMessage="No clients found"
        storageKey="clients"
      />
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

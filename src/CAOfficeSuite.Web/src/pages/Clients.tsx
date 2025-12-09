import { useEffect, useState, useCallback } from 'react';
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
  faPlus,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../store/useAuth';
import { clientApiService } from '../services/apiClient';
import type { Client, Engagement, ClientQueryParams } from '../types';
import { DataGrid, ClientFormModal, type Column } from '../components/common';
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
  const [error, setError] = useState<string | null>(null);
  const [totalClients, setTotalClients] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Fetch clients from API
  const fetchClients = useCallback(async (params: ClientQueryParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await clientApiService.getClients({
        page: currentPage,
        page_size: pageSize,
        ...params,
      });
      
      setClients(result.items);
      setTotalClients(result.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch clients';
      setError(errorMessage);
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleCreate = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = async (clientId: string) => {
    if (!window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      return;
    }

    try {
      await clientApiService.deleteClient(clientId);
      await fetchClients(); // Refresh the list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete client';
      alert(`Error: ${errorMessage}`);
      console.error('Error deleting client:', err);
    }
  };

  const handleSave = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingClient) {
        await clientApiService.updateClient(editingClient.id, clientData);
      } else {
        await clientApiService.createClient(clientData);
      }
      await fetchClients(); // Refresh the list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save client';
      throw new Error(errorMessage);
    }
  };

  // Define columns for the DataGrid
  const columns: Column<Client>[] = [
    {
      id: 'actions',
      label: 'Actions',
      accessor: 'id',
      sortable: false,
      filterable: false,
      width: 120,
      render: (_, row) => (
        <div className="action-buttons">
          <button
            onClick={() => handleEdit(row)}
            className="btn-icon"
            title="Edit client"
            aria-label="Edit client"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="btn-icon btn-danger"
            title="Delete client"
            aria-label="Delete client"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
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
      id: 'email',
      label: 'Email',
      accessor: 'email',
      sortable: true,
      filterable: true,
      render: value => value || '-',
    },
    {
      id: 'phone',
      label: 'Phone',
      accessor: 'phone',
      sortable: true,
      filterable: true,
      render: value => value || '-',
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
      id: 'address',
      label: 'Address',
      accessor: 'address',
      sortable: true,
      filterable: true,
      visible: false, // Hidden by default
      render: value => value || '-',
    },
  ];

  if (error) {
    return (
      <div className="clients-page">
        <div className="page-header">
          <h1>Client Control</h1>
          <p>Manage your client portfolio</p>
        </div>
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={() => fetchClients()} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="clients-page">
      <div className="page-header">
        <div>
          <h1>Client Control</h1>
          <p>Manage your client portfolio ({totalClients} total)</p>
        </div>
        <button onClick={handleCreate} className="btn-primary">
          <FontAwesomeIcon icon={faPlus} />
          Create Client
        </button>
      </div>

      <DataGrid
        data={clients}
        columns={columns}
        loading={loading}
        emptyMessage="No clients found"
        storageKey="clients"
      />

      <ClientFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingClient(null);
        }}
        onSave={handleSave}
        client={editingClient}
      />
    </div>
  );
}

function ClientDetail({ clientId }: { clientId: string }) {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [clientData, engagementsData] = await Promise.all([
          clientApiService.getClientById(clientId),
          clientApiService.getClientEngagements(clientId, { page_size: 100 }),
        ]);
        
        setClient(clientData);
        setEngagements(engagementsData.items);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch client details';
        setError(errorMessage);
        console.error('Error fetching client details:', err);
      } finally {
        setLoading(false);
      }
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

  if (error) {
    return (
      <div className="not-found">
        <h2>Error Loading Client</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/clients')} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Clients
        </button>
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
            {client.email && (
              <div className="info-item">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{client.email}</span>
              </div>
            )}
            {client.phone && (
              <div className="info-item">
                <FontAwesomeIcon icon={faPhone} />
                <span>{client.phone}</span>
              </div>
            )}
            {client.address && (
              <div className="info-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>{client.address}</span>
              </div>
            )}
            {!client.email && !client.phone && !client.address && (
              <p className="no-info">No contact information available</p>
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
            <div className="info-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Created: {new Date(client.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-section engagements-section">
        <h2>
          <FontAwesomeIcon icon={faTasks} />
          Engagements ({engagements.length})
        </h2>
        {engagements.length > 0 ? (
          <div className="engagements-list">
            {engagements.map(engagement => (
              <div key={engagement.id} className="engagement-item">
                <div className="engagement-info">
                  <span className="engagement-file-number">
                    File #{engagement.file_number}
                    {engagement.file_number_as_per && ` (${engagement.file_number_as_per})`}
                  </span>
                  <span className={`engagement-type`}>{engagement.type}</span>
                  {engagement.type2 && (
                    <span className="engagement-type2">{engagement.type2}</span>
                  )}
                </div>
                <div className="engagement-meta">
                  {engagement.senior && (
                    <span className="engagement-senior">Senior: {engagement.senior}</span>
                  )}
                  {engagement.assistant && (
                    <span className="engagement-assistant">Assistant: {engagement.assistant}</span>
                  )}
                  <span className={`engagement-status ${engagement.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {engagement.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-engagements">No engagements found for this client</p>
        )}
      </div>
    </div>
  );
}

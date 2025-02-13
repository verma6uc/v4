import { generateUUID } from '../../utils/uuid';

export const simpleColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true }
];

export const simpleData = [
  {
    id: generateUUID(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
    status: 'Active'
  },
  {
    id: generateUUID(),
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Designer',
    status: 'Active'
  },
  {
    id: generateUUID(),
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Manager',
    status: 'Inactive'
  },
  {
    id: generateUUID(),
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Developer',
    status: 'Active'
  },
  {
    id: generateUUID(),
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Designer',
    status: 'Active'
  }
];

export const advancedColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastActive', label: 'Last Active', sortable: true }
];

export const advancedData = [
  {
    id: generateUUID(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Senior Developer',
    department: 'Engineering',
    status: 'Active',
    lastActive: '2 hours ago'
  },
  {
    id: generateUUID(),
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'UI Designer',
    department: 'Design',
    status: 'Active',
    lastActive: '5 minutes ago'
  },
  {
    id: generateUUID(),
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Project Manager',
    department: 'Management',
    status: 'Inactive',
    lastActive: '3 days ago'
  },
  {
    id: generateUUID(),
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Full Stack Developer',
    department: 'Engineering',
    status: 'Active',
    lastActive: '1 hour ago'
  },
  {
    id: generateUUID(),
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'UX Designer',
    department: 'Design',
    status: 'Active',
    lastActive: '30 minutes ago'
  },
  {
    id: generateUUID(),
    name: 'Eva Martinez',
    email: 'eva.martinez@example.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'Active',
    lastActive: '15 minutes ago'
  },
  {
    id: generateUUID(),
    name: 'David Lee',
    email: 'david.lee@example.com',
    role: 'Backend Developer',
    department: 'Engineering',
    status: 'Active',
    lastActive: '45 minutes ago'
  }
];
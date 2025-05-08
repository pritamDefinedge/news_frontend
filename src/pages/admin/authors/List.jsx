import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Paper,
  Badge
} from "@mui/material";
import {
  AddCircleRounded,
  Edit,
  Delete,
  Block,
  Search,
  FilterList,
  MoreVert,
  Person,
  Email,
  Phone,
  CalendarToday,
  CheckCircle,
  Cancel
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: status === 'Active' ? theme.palette.success.light : theme.palette.error.light,
  color: status === 'Active' ? theme.palette.success.dark : theme.palette.error.dark,
  fontWeight: 600,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

// Sample data for users
const usersData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    status: "Active",
    role: "Admin",
    createdAt: "2025-05-01T10:30:00",
    lastLogin: "2025-06-15T14:45:00",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (987) 654-3210",
    status: "Blocked",
    role: "Editor",
    createdAt: "2025-04-15T09:15:00",
    lastLogin: "2025-05-20T11:20:00",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 3,
    firstName: "James",
    lastName: "Johnson",
    email: "james.johnson@example.com",
    phone: "+1 (555) 555-5555",
    status: "Active",
    role: "User",
    createdAt: "2025-04-10T16:45:00",
    lastLogin: "2025-06-18T08:30:00",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "+1 (123) 555-7890",
    status: "Active",
    role: "Editor",
    createdAt: "2025-05-02T14:20:00",
    lastLogin: "2025-06-17T09:45:00",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "+1 (234) 567-8901",
    status: "Active",
    role: "User",
    createdAt: "2025-03-28T11:10:00",
    lastLogin: "2025-06-16T13:15:00",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 6,
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (345) 678-9012",
    status: "Blocked",
    role: "User",
    createdAt: "2025-05-20T08:45:00",
    lastLogin: "2025-05-25T10:30:00",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

// UserCard Component
const UserCard = ({ user, onEdit, onDelete, onBlock, onViewProfile }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledCard>
        <CardContent sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    bgcolor: user.status === 'Active' ? theme.palette.success.main : theme.palette.error.main,
                    border: `2px solid ${theme.palette.background.paper}`,
                  }}
                />
              }
            >
              <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                src={user.avatar}
                sx={{ width: 80, height: 80 }}
              />
            </Badge>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>

          <StatusChip
            label={user.status}
            status={user.status}
            size="small"
            sx={{ mb: 1, mx: 'auto', display: 'flex' }}
          />

          <Chip
            label={user.role}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ mb: 2, mx: 'auto', display: 'flex' }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email color="action" sx={{ mr: 1, fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {user.email}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Phone color="action" sx={{ mr: 1, fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary">
              {user.phone}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarToday color="action" sx={{ mr: 1, fontSize: 18 }} />
            <Typography variant="caption" color="text.secondary">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>

        <Divider sx={{ my: 1 }} />

        <CardActions sx={{ justifyContent: 'center', p: 1 }}>
          {isMobile ? (
            <IconButton
              aria-label="more actions"
              onClick={(e) => {
                e.stopPropagation();
                // Implement mobile menu here
              }}
            >
              <MoreVert />
            </IconButton>
          ) : (
            <>
              <ActionButton
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(user);
                }}
                sx={{ color: theme.palette.info.main }}
              >
                <Edit fontSize="small" />
              </ActionButton>

              <ActionButton
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(user);
                }}
                sx={{ color: theme.palette.error.main }}
              >
                <Delete fontSize="small" />
              </ActionButton>

              <ActionButton
                aria-label={user.status === 'Blocked' ? 'unblock' : 'block'}
                onClick={(e) => {
                  e.stopPropagation();
                  onBlock(user);
                }}
                sx={{ 
                  color: user.status === 'Blocked' 
                    ? theme.palette.success.main 
                    : theme.palette.warning.main 
                }}
              >
                {user.status === 'Blocked' ? (
                  <CheckCircle fontSize="small" />
                ) : (
                  <Cancel fontSize="small" />
                )}
              </ActionButton>
            </>
          )}
        </CardActions>
      </StyledCard>
    </Grid>
  );
};

// Main List Component
const UserList = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = usersData.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const handleEdit = (user) => {
    console.log("Edit user", user);
    // Add logic to edit user
  };

  const handleDelete = (user) => {
    console.log("Delete user", user);
    // Add confirmation dialog before delete
  };

  const handleBlock = (user) => {
    console.log(`${user.status === "Blocked" ? "Unblock" : "Block"} user`, user);
    // Add confirmation dialog before block/unblock
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleAddUser = () => {
    console.log("Add new user");
    // Add logic for adding a user
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2
        }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            User Management
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search users..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                width: { xs: '100%', sm: 240 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                }
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ borderRadius: 3 }}
            >
              Filters
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleRounded />}
              onClick={handleAddUser}
              sx={{ borderRadius: 3 }}
            >
              Add User
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* User Grid */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBlock={handleBlock}
            onViewProfile={handleViewProfile}
          />
        ))}
      </Grid>

      {/* User Detail Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
      >
        {selectedUser && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 2
            }}>
              <Avatar
                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                src={selectedUser.avatar}
                sx={{ width: 48, height: 48 }}
              />
              <Box>
                <Typography variant="h6">
                  {selectedUser.firstName} {selectedUser.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.role}
                </Typography>
              </Box>
              <Box flexGrow={1} />
              <StatusChip 
                label={selectedUser.status} 
                status={selectedUser.status}
              />
            </DialogTitle>
            
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedUser.email}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedUser.phone}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Joined On
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Login
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {new Date(selectedUser.lastLogin).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default UserList;
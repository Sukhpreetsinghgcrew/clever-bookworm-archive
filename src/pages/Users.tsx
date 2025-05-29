
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, Mail, Phone, Filter } from 'lucide-react';
import usersData from '@/data/users.json';
import AddUserModal from '@/components/AddUserModal';

const Users = () => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const roles = ['all', 'student', 'librarian'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (newUser: any) => {
    setUsers(prev => [...prev, newUser]);
    console.log('New user added:', newUser);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Users Management
          </h1>
          <p className="text-gray-600 mt-2">Manage library users and staff</p>
        </div>
        <AddUserModal onAddUser={handleAddUser} />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search users by name, email, or ID..."
            className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-md transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white shadow-md transition-all duration-300 min-w-[200px]"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUsers.map((user, index) => (
          <Card key={user.id} className="hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-blue-200 group"
                style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-300">{user.name}</CardTitle>
                <Badge variant={user.role === 'librarian' ? "secondary" : "default"} 
                       className={user.role === 'librarian' ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-blue-500 hover:bg-blue-600"}>
                  {user.role}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 font-medium">{user.department}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold text-gray-700">ID:</span>
                    <span className="text-gray-600">{user.studentId}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="truncate text-blue-600">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{user.phone}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-700">Joined:</span> {new Date(user.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={user.status === 'active' ? "default" : "secondary"} 
                       className={user.status === 'active' ? "bg-green-500 hover:bg-green-600" : ""}>
                  {user.status}
                </Badge>
              </div>
              <div className="flex gap-3 mt-6">
                <Button size="sm" variant="outline" className="flex-1 border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                  View History
                </Button>
                <Button size="sm" variant="outline" className="border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
          <CardContent className="text-center py-16">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-700 mb-3">No users found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Users;

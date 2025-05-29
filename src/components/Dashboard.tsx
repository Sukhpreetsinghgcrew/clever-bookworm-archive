
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, User, BookOpen, AlertTriangle } from 'lucide-react';
import booksData from '@/data/books.json';
import usersData from '@/data/users.json';
import transactionsData from '@/data/transactions.json';

const Dashboard = () => {
  const totalBooks = booksData.length;
  const totalUsers = usersData.filter(user => user.role === 'student').length;
  const borrowedBooks = transactionsData.filter(t => t.status === 'borrowed').length;
  const overdueBooks = transactionsData.filter(t => t.status === 'overdue').length;
  const availableBooks = booksData.reduce((sum, book) => sum + book.availableCopies, 0);

  const recentTransactions = transactionsData
    .sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          Library Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Welcome to your library management system</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Books</CardTitle>
            <div className="p-2 bg-blue-500 rounded-full">
              <Book className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{totalBooks}</div>
            <p className="text-xs text-blue-600 mt-1">
              {availableBooks} available copies
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Active Users</CardTitle>
            <div className="p-2 bg-green-500 rounded-full">
              <User className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{totalUsers}</div>
            <p className="text-xs text-green-600 mt-1">
              Students registered
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Books Borrowed</CardTitle>
            <div className="p-2 bg-purple-500 rounded-full">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{borrowedBooks}</div>
            <p className="text-xs text-purple-600 mt-1">
              Currently checked out
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Overdue Books</CardTitle>
            <div className="p-2 bg-red-500 rounded-full animate-pulse">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-900">{overdueBooks}</div>
            <p className="text-xs text-red-600 mt-1">
              Need immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
          <CardDescription className="text-gray-200">Latest borrowing activities in your library</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => {
              const book = booksData.find(b => b.id === transaction.bookId);
              const user = usersData.find(u => u.id === transaction.userId);
              return (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-4 border-l-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:bg-gray-50"
                  style={{
                    borderLeftColor: 
                      transaction.status === 'borrowed' ? '#3b82f6' :
                      transaction.status === 'returned' ? '#10b981' : '#ef4444',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full shadow-lg ${
                      transaction.status === 'borrowed' ? 'bg-blue-500 animate-pulse' :
                      transaction.status === 'returned' ? 'bg-green-500' :
                      'bg-red-500 animate-bounce'
                    }`} />
                    <div>
                      <p className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">{book?.title}</p>
                      <p className="text-sm text-gray-500">by {user?.name} • {user?.studentId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      transaction.status === 'borrowed' ? 'bg-blue-100 text-blue-800' :
                      transaction.status === 'returned' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{transaction.borrowDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

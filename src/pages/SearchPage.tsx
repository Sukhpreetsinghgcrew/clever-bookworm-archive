
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Book, User, BookOpen } from 'lucide-react';
import booksData from '@/data/books.json';
import usersData from '@/data/users.json';
import transactionsData from '@/data/transactions.json';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('books');

  const searchBooks = () => {
    return booksData.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const searchUsers = () => {
    return usersData.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const searchResults = searchTerm ? (searchType === 'books' ? searchBooks() : searchUsers()) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Search Library</h1>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>Find Books and Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant={searchType === 'books' ? 'default' : 'outline'}
                onClick={() => setSearchType('books')}
                className="flex items-center space-x-2"
              >
                <Book className="h-4 w-4" />
                <span>Books</span>
              </Button>
              <Button
                variant={searchType === 'users' ? 'default' : 'outline'}
                onClick={() => setSearchType('users')}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Users</span>
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={searchType === 'books' ? 
                  'Search by title, author, ISBN, or category...' : 
                  'Search by name, email, ID, or department...'}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchTerm && (
        <Card>
          <CardHeader>
            <CardTitle>
              Search Results ({searchResults.length} found)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">Try different search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchType === 'books' && searchResults.map((book: any) => (
                  <Card key={book.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{book.title}</h3>
                        <Badge variant={book.availableCopies > 0 ? "default" : "destructive"}>
                          {book.availableCopies > 0 ? 'Available' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">by {book.author}</p>
                      <div className="space-y-1 text-sm text-gray-500">
                        <p><strong>ISBN:</strong> {book.isbn}</p>
                        <p><strong>Category:</strong> {book.category}</p>
                        <p><strong>Copies:</strong> {book.availableCopies}/{book.totalCopies}</p>
                      </div>
                      <Button size="sm" className="mt-3 w-full">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                {searchType === 'users' && searchResults.map((user: any) => (
                  <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <Badge variant={user.role === 'librarian' ? "secondary" : "default"}>
                          {user.role}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-500">
                        <p><strong>ID:</strong> {user.studentId}</p>
                        <p><strong>Department:</strong> {user.department}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                      </div>
                      <Button size="sm" className="mt-3 w-full" variant="outline">
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      {!searchTerm && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Library Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactionsData.slice(0, 8).map((transaction) => {
                const book = booksData.find(b => b.id === transaction.bookId);
                const user = usersData.find(u => u.id === transaction.userId);
                return (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        transaction.status === 'borrowed' ? 'bg-blue-500' :
                        transaction.status === 'returned' ? 'bg-green-500' :
                        'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{book?.title}</p>
                        <p className="text-sm text-gray-500">{user?.name} • {user?.studentId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        transaction.status === 'borrowed' ? 'default' :
                        transaction.status === 'returned' ? 'secondary' :
                        'destructive'
                      }>
                        {transaction.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{transaction.borrowDate}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPage;

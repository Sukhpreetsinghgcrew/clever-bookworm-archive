
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Filter } from 'lucide-react';
import booksData from '@/data/books.json';
import AddBookModal from '@/components/AddBookModal';

const Books = () => {
  const [books, setBooks] = useState(booksData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(books.map(book => book.category))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddBook = (newBook: any) => {
    setBooks(prev => [...prev, newBook]);
    console.log('New book added:', newBook);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Books Management
          </h1>
          <p className="text-gray-600 mt-2">Manage your library's book collection</p>
        </div>
        <AddBookModal onAddBook={handleAddBook} />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search books by title or author..."
            className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-md transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white shadow-md transition-all duration-300 min-w-[200px]"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map((book, index) => (
          <Card key={book.id} className="hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-blue-200 group"
                style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{book.title}</CardTitle>
                <Badge variant={book.availableCopies > 0 ? "default" : "destructive"} 
                       className={book.availableCopies > 0 ? "bg-green-500 hover:bg-green-600" : "animate-pulse"}>
                  {book.availableCopies > 0 ? 'Available' : 'Out of Stock'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 font-medium">by {book.author}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <p className="text-sm"><span className="font-semibold text-gray-700">ISBN:</span> <span className="text-gray-600">{book.isbn}</span></p>
                  <p className="text-sm"><span className="font-semibold text-gray-700">Category:</span> <span className="text-blue-600 font-medium">{book.category}</span></p>
                  <p className="text-sm"><span className="font-semibold text-gray-700">Published:</span> <span className="text-gray-600">{book.publishYear}</span></p>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700">Copies:</span> 
                    <span className={`ml-1 font-bold ${book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {book.availableCopies}/{book.totalCopies}
                    </span>
                    <span className="text-gray-500"> available</span>
                  </p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{book.description}</p>
              </div>
              <div className="flex gap-3 mt-6">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-300">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Borrow
                </Button>
                <Button size="sm" variant="outline" className="border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
          <CardContent className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-700 mb-3">No books found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Books;

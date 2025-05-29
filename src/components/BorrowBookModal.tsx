
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BookOpen } from 'lucide-react';
import usersData from '@/data/users.json';

interface BorrowBookModalProps {
  book: any;
  onBorrow: (bookId: string, userId: string) => void;
}

const BorrowBookModal = ({ book, onBorrow }: BorrowBookModalProps) => {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const students = usersData.filter(user => user.role === 'student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedUserId) {
      onBorrow(book.id, selectedUserId);
      setSelectedUserId('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-300"
          disabled={book.availableCopies === 0}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Borrow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Borrow Book
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-sm text-green-600 font-medium mt-2">
              Available Copies: {book.availableCopies}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student">Select Student</Label>
              <select
                id="student"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Choose a student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.studentId} ({student.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Confirm Borrow
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;

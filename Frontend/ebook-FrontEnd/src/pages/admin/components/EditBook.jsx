import {
  CircularProgress,
  Button,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormControlLabel,
  Autocomplete,
  RadioGroup,
  Radio,
  FormControlLabel as RadioFormControlLabel
} from "@mui/material";
import { useState, useEffect } from "react";
import { getBookById, updateBook } from "../service/admin";
import { useParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";
const genres = [
  "Programming", "Fiction", "Classic", "Science Fiction", "Romance", "Fantasy", 
  "Biography", "History", "Mystery", "Self-Help", "Thriller", "Non-Fiction", 
  "Young Adult", "Children's", "Philosophy", "Graphic Novel", "Education", 
  "Horror", "Adventure", "Poetry"
];

const conditions = ["New", "Like New", "Used - Good", "Used - Acceptable"];
const statuses = ["Available", "Sold Out"];
const editions = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

export default function EditBook() {
  const [Book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    genre: "",
    condition: "",
    edition: "",
    imageUrl: "",
    status: "Available",
  });

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBookById(id);
        if (res.status === 200) {
          setBook(res.data.book[0]);
        }
      } catch (error) {
        console.error("Failed to fetch book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await updateBook(id, Book);
      if (res.status === 200) {
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        Swal.fire({
                  title: "book is successfully Updated ",
                  icon: "success",
                  confirmButtonText: "OK",
                  confirmButtonColor: "#3085d6",
                });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Failed to update book:", error);
      enqueueSnackbar("Failed to update book", { variant: "error" });
    }
  };

  const handleImageSearch = () => {
    if (!Book.title) {
      alert("Please enter a book title first.");
      return;
    }
    const query = encodeURIComponent(Book.title.trim());
    const url = `https://www.google.com/search?hl=en&tbm=isch&q=${query}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!Book || !Book._id) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl">
        Book not found or invalid ID.
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex justify-center items-center h-screen mt-10">
        <div className="flex w-full max-w-screen-xl shadow-lg rounded-lg overflow-hidden">
          <div className="p-5">
            <div className="mb-6 w-full sm:w-[400px]">
              <TextField
                required
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={Book.imageUrl}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleImageSearch} edge="end">
                        <SearchIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className="mb-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 p-2"
              />
            </div>

            <div className="w-full sm:w-[400px] bg-gray-800 flex items-center justify-center p-6 rounded-2xl">
              <img
                src={Book.imageUrl}
                alt="Book"
                className="w-full h-auto object-contain rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              />
            </div>

            <p className="text-2xl font-bold text-green-600">${Book.price}</p>
          </div>

          <div className="w-full sm:w-3/5 flex items-center justify-center p-6">
            <div className="w-full p-6">
              <div className="mb-6">
                <TextField
                  label="Title"
                  name="title"
                  value={Book.title}
                  onChange={handleChange}
                  fullWidth
                  className="border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="mb-6">
                <TextField
                  label="Author"
                  name="author"
                  value={Book.author}
                  onChange={handleChange}
                  fullWidth
                  className="border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="mb-6">
                <TextField
                  label="Description"
                  name="description"
                  value={Book.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  className="mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 p-2"
                />
              </div>

              <div className="mb-6">
                {/* Genre Searchable Dropdown */}
                <Autocomplete
                  options={genres}
                  value={Book.genre}
                  onChange={(event, newValue) => setBook({ ...Book, genre: newValue })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Genre"
                      variant="outlined"
                      fullWidth
                      className="border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  )}
                />
              </div>

              <div className="mb-6">
                {/* Condition Searchable Dropdown */}
                <Autocomplete
                  options={conditions}
                  value={Book.condition}
                  onChange={(event, newValue) => setBook({ ...Book, condition: newValue })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Condition"
                      variant="outlined"
                      fullWidth
                      className="border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  )}
                />
              </div>

              <div className="mb-6">
                <p className="mb-2">Edition</p>
                <RadioGroup
                  row
                  value={Book.edition}
                  onChange={(e) => setBook({ ...Book, edition: e.target.value })}
                  name="edition"
                >
                  {editions.map((edition) => (
                    <RadioFormControlLabel
                      key={edition}
                      value={edition}
                      control={<Radio />}
                      label={edition}
                    />
                  ))}
                </RadioGroup>
              </div>

              <div className="mb-6">
                <FormControl fullWidth className="mb-4">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={Book.status}
                    onChange={handleChange}
                    className="border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 p-2"
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="mb-6">
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={Book.price}
                  onChange={handleChange}
                  fullWidth
                  className="mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 p-2"
                />
              </div>

              <div className="flex justify-end items-center mt-6">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                  className="transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Update Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

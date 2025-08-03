import {
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Avatar,
  Typography,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useState, useEffect } from "react";
import { postBook } from "../service/admin";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";

const genres = [
  "Programming",
  "Mythology",
  "Fiction",
  "Classic",
  "Science Fiction",
  "Romance",
  "Fantasy",
  "Biography",
  "History",
  "Mystery",
  "Self-Help",
  "Thriller",
  "Non-Fiction",
  "Young Adult",
  "Children's",
  "Philosophy",
  "Graphic Novel",
  "Education",
  "Horror",
  "Adventure",
  "Poetry",
];

const conditions = ["New", "Like New", "Used - Good", "Used - Acceptable"];
const statuses = ["Available", "Sold Out"];
const editions = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

export default function PostBook() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [book, setBook] = useState({
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

  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      book.title.trim() &&
      book.author.trim() &&
      book.description.trim() &&
      book.price > 0 &&
      book.genre &&
      book.condition &&
      book.imageUrl.trim() &&
      book.status;
    setFormValid(isValid);
  }, [book]);

  const handleInputChange = ({ target: { name, value } }) => {
    const newValue = name === "price" ? parseFloat(value) || 0 : value;
    setBook((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postBook(book);
      if (res.status === 201) {
        Swal.fire({
          title: "Yay! New book posted.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
        enqueueSnackbar("Book Posted Successfully", { variant: "success" });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to post book", { variant: "error" });
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleImageSearch = () => {
    if (!book.title) {
      Swal.fire("Missing Title", "Please enter a book title first.", "warning");
      return;
    }

    Swal.fire({
      title: "Search Book Image?",
      text: `Do you want to search images for "${book.title}" on Google?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, search it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const query = encodeURIComponent(book.title.trim());
        const url = `https://www.google.com/search?hl=en&tbm=isch&q=${query}`;
        window.open(url, "_blank");
      }
    });
  };

  return (
    <div className="p-5">
      <div className="flex justify-center items-center ">
        <div className="flex w-full max-w-screen-xl shadow-lg rounded-lg overflow-hidden">
          {/* Left: Image and URL */}
          <div className="p-5 mt-8">
            <div className="mb-6 w-full sm:w-[400px]">
              <TextField
                required
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={book.imageUrl}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleImageSearch} edge="end">
                        <SearchIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="w-full sm:w-[400px] bg-gray-800 flex items-center justify-center p-6 rounded-2xl">
              {book.imageUrl ? (
                <img
                  src={book.imageUrl}
                  alt="Book"
                  className="w-full h-auto object-contain rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                />
              ) : (
                <Typography variant="subtitle1" color="white">
                  Image preview will appear here
                </Typography>
              )}
            </div>

            <div className="flex justify-end-safe">
              <p className="text-2xl  font-bold text-green-600 mt-4">
                ${book.price || 0}
              </p>
            </div>

            </div>

          {/* Right: Form Fields */}
          <div className="w-full sm:w-3/5 flex items-center justify-center p-5">
            <div className="w-full p-6">
              <div className="flex items-center gap-2 mb-6">
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LibraryBooksIcon />
                </Avatar>
                <Typography variant="h5" className="text-blue-600 font-semibold">
                  Post a Book
                </Typography>
              </div>

              {[{ label: "Title", name: "title" },
                { label: "Author", name: "author" },
                { label: "Description", name: "description", multiline: true, rows: 3 },
                { label: "Price", name: "price", type: "number" },
              ].map(({ name, ...props }) => (
                <div className="mb-4" key={name}>
                  <TextField
                    fullWidth
                    required
                    name={name}
                    label={props.label}
                    value={book[name]}
                    onChange={handleInputChange}
                    {...props}
                  />
                </div>
              ))}

              <div className="mb-4">
                <Autocomplete
                  fullWidth
                  required
                  options={genres}
                  value={book.genre}
                  onChange={(event, newValue) => handleInputChange({ target: { name: "genre", value: newValue } })}
                  renderInput={(params) => <TextField {...params} label="Genre" />}
                />
              </div>

              <div className="mb-4">
                <Autocomplete
                  fullWidth
                  required
                  options={conditions}
                  value={book.condition}
                  onChange={(event, newValue) => handleInputChange({ target: { name: "condition", value: newValue } })}
                  renderInput={(params) => <TextField {...params} label="Condition" />}
                />
              </div>

              <div className="mb-4">
                <TextField
                  select
                  required
                  fullWidth
                  label="Status"
                  name="status"
                  value={book.status}
                  onChange={handleInputChange}
                >
                  {statuses.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="mb-6">
                <p className="mb-2">Edition <sup>*</sup></p>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    value={book.edition}
                    onChange={(e) => setBook({ ...book, edition: e.target.value })}
                    name="edition"
                  >
                    {editions.map((edition) => (
                      <FormControlLabel
                        key={edition}
                        value={edition}
                        control={<Radio />}
                        label={edition}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>

              {formValid && (
                <div className="flex justify-end mt-6">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit Book"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

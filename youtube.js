import axios from "axios";

export default axios.create({
  baseURL: "http://18.136.106.220:8000",
});
CMD[("python", "backend/manage.py", "makemigrations", "accounts")];
CMD[("python", "backend/manage.py", "makemigrations", "videos")];
CMD[("python", "backend/manage.py", "migrate", "accounts")];
CMD[("python", "backend/manage.py", "migrate", "videos")];

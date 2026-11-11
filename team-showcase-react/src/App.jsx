
import { useState } from "react";
import "./App.css";

const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "Frontend Developer",
    department: "Development",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Creates beautiful and responsive user interfaces.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    department: "Design",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Designs simple and user-friendly experiences.",
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Backend Developer",
    department: "Development",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    description: "Builds APIs and manages server-side applications.",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Marketing Manager",
    department: "Marketing",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    description: "Plans marketing strategies and campaigns.",
  },
  {
    id: 5,
    name: "Michael Davis",
    role: "Full Stack Developer",
    department: "Development",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    description: "Works on frontend and backend development.",
  },
  {
    id: 6,
    name: "Olivia Taylor",
    role: "Graphic Designer",
    department: "Design",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    description: "Creates visual designs and brand graphics.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || member.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>Meet Our Team</h1>
        <p>
          The talented people behind our success.
        </p>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <main className="team-grid">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div className="team-card" key={member.id}>
              <img
                src={member.image}
                alt={member.name}
              />

              <div className="team-info">
                <h2>{member.name}</h2>

                <h4>{member.role}</h4>

                <span>{member.department}</span>

                <p>{member.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">
            No team members found.
          </p>
        )}
      </main>

      <footer>
        <p>© 2026 Our Team. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;


import { useState } from "react";
import "./App.css";

function App() {
  const [columns, setColumns] = useState({
    todo: [
      { id: "card1", text: "Wash Dishes" },
      { id: "card2", text: "Buy Groceries" },
      { id: "card3", text: "Complete pending works" },
    ],
    progress: [{ id: "card4", text: "Learn to code" }],
    done: [{ id: "card5", text: "Learn rubics cube" }],
  });

  const [draggedCard, setDraggedCard] = useState(null);
  const [activeColumn, setActiveColumn] = useState("");

  // Runs when we start dragging a card
  const handleDragStart = (card, sourceColumn) => {
    setDraggedCard({ card, sourceColumn });
  };

  // Allows a column to receive a dragged card
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Highlights the column when a card enters it
  const handleDragEnter = (columnId) => {
    setActiveColumn(columnId);
  };

  // Removes the highlight when the card leaves
  const handleDragLeave = (event, columnId) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setActiveColumn("");
    }
  };

  // Moves the card into the selected column
  const handleDrop = (event, targetColumn) => {
    event.preventDefault();

    if (!draggedCard) return;

    const { card, sourceColumn } = draggedCard;

    if (sourceColumn === targetColumn) {
      setActiveColumn("");
      setDraggedCard(null);
      return;
    }

    setColumns((previousColumns) => {
      const updatedColumns = { ...previousColumns };

      updatedColumns[sourceColumn] = previousColumns[
        sourceColumn
      ].filter((item) => item.id !== card.id);

      updatedColumns[targetColumn] = [
        ...previousColumns[targetColumn],
        card,
      ];

      return updatedColumns;
    });

    setActiveColumn("");
    setDraggedCard(null);
  };

  const columnDetails = [
    { id: "todo", title: "To Do" },
    { id: "progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  return (
    <div className="container">
      <h1>Simple Kanban Board</h1>
      <p className="subtitle">
        Drag and drop your tasks between columns
      </p>

      <div className="board">
        {columnDetails.map((column) => (
          <div
            className={`list ${
              activeColumn === column.id ? "over" : ""
            }`}
            key={column.id}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(column.id)}
            onDragLeave={(event) =>
              handleDragLeave(event, column.id)
            }
            onDrop={(event) => handleDrop(event, column.id)}
          >
            <h2>{column.title}</h2>

            {columns[column.id].map((card) => (
              <div
                className="task-card"
                key={card.id}
                draggable
                onDragStart={() =>
                  handleDragStart(card, column.id)
                }
                onDragEnd={() => {
                  setDraggedCard(null);
                  setActiveColumn("");
                }}
              >
                {card.text}
              </div>
            ))}

            {columns[column.id].length === 0 && (
              <p className="empty-message">Drop tasks here</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

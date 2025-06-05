// Task Manager JavaScript

class TaskManager {
  constructor() {
    // Initial hardcoded tasks as specified in the challenge
    this.tasks = [
      { id: 1, title: "Buy groceries", completed: false },
      { id: 2, title: "Read a book", completed: true },
      { id: 3, title: "Complete internship challenge", completed: false },
      { id: 4, title: "Learn vanilla JavaScript", completed: true },
    ]

    this.taskInput = document.getElementById("taskInput")
    this.addTaskBtn = document.getElementById("addTaskBtn")
    this.tasksList = document.getElementById("tasksList")
    this.emptyState = document.getElementById("emptyState")
    this.totalTasksEl = document.getElementById("totalTasks")
    this.completedTasksEl = document.getElementById("completedTasks")
    this.progressText = document.getElementById("progressText")
    this.progressFill = document.getElementById("progressFill")

    this.init()
  }

  init() {
    // Event listeners
    this.addTaskBtn.addEventListener("click", () => this.addTask())
    this.taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addTask()
      }
    })
    this.taskInput.addEventListener("input", () => this.updateAddButton())

    // Initial render
    this.render()
    this.updateAddButton()
  }

  addTask() {
    const title = this.taskInput.value.trim()
    if (!title) return

    const newTask = {
      id: Math.max(...this.tasks.map((t) => t.id), 0) + 1,
      title: title,
      completed: false,
    }

    this.tasks.push(newTask)
    this.taskInput.value = ""
    this.render()
    this.updateAddButton()
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.render()
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id)
    this.render()
  }

  updateAddButton() {
    const hasText = this.taskInput.value.trim().length > 0
    this.addTaskBtn.disabled = !hasText
  }

  render() {
    this.renderTasks()
    this.updateStats()
    this.updateProgress()
  }

  renderTasks() {
    if (this.tasks.length === 0) {
      this.tasksList.style.display = "none"
      this.emptyState.style.display = "block"
      return
    }

    this.tasksList.style.display = "flex"
    this.emptyState.style.display = "none"

    this.tasksList.innerHTML = this.tasks
      .map(
        (task) => `
            <div class="task-item ${task.completed ? "completed" : ""}">
                <div class="task-checkbox ${task.completed ? "completed" : ""}" 
                     onclick="taskManager.toggleTask(${task.id})">
                    ${task.completed ? "✓" : ""}
                </div>
                <span class="task-title ${task.completed ? "completed" : ""}">${this.escapeHtml(task.title)}</span>
                <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})" title="Delete task">
                    🗑️
                </button>
            </div>
        `,
      )
      .join("")
  }

  updateStats() {
    const total = this.tasks.length
    const completed = this.tasks.filter((t) => t.completed).length

    this.totalTasksEl.textContent = total
    this.completedTasksEl.textContent = completed
  }

  updateProgress() {
    const total = this.tasks.length
    const completed = this.tasks.filter((t) => t.completed).length

    if (total === 0) {
      this.progressText.textContent = "0/0 completed"
      this.progressFill.style.width = "0%"
    } else {
      this.progressText.textContent = `${completed}/${total} completed`
      this.progressFill.style.width = `${(completed / total) * 100}%`
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }
}

// Initialize the task manager when the page loads
document.addEventListener("DOMContentLoaded", () => {
  window.taskManager = new TaskManager()
})

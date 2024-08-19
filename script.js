class Task {
  constructor(id, description) {
    this.id = id;
    this.description = description;
  }
}

class TaskRepository {
  constructor() {
    this.tasks = new Map();
  }

  addTask(task) {
    this.tasks.set(task.id, task);
  }

  getTask(id) {
    return this.tasks.get(id);
  }

  removeTask(id) {
    this.tasks.delete(id);
  }
}

class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  addTask(id, description) {
    const task = new Task(id, description);
    this.taskRepository.addTask(task);
  }

  getTask(id) {
    return this.taskRepository.getTask(id);
  }

  removeTask(id) {
    this.taskRepository.removeTask(id);
  }
}

const sinon = require("sinon");
const { assert } = require("chai");

describe("TaskService", function () {
  let taskService;
  let mockTaskRepository;

  beforeEach(function () {
    mockTaskRepository = {
      addTask: sinon.spy(),
      getTask: sinon.stub().returns(new Task(1, "Test Task")),
      removeTask: sinon.spy(),
    };
    taskService = new TaskService(mockTaskRepository);
  });

  it("should add a task", function () {
    taskService.addTask(1, "Test Task");
    assert(mockTaskRepository.addTask.calledOnce);
  });

  it("should get a task", function () {
    const task = taskService.getTask(1);
    assert.equal(task.description, "Test Task");
  });

  it("should remove a task", function () {
    taskService.removeTask(1);
    assert(mockTaskRepository.removeTask.calledOnce);
  });
});

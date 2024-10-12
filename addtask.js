document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('newTask');
    const addButton = document.getElementsByTagName('button')[0];
    const tasksListUL = document.getElementById('taskList');
  
    loadTasks();
  
    addButton.onclick = () => {
      if (taskInput.value == '') return;
      addTask(taskInput.value);
      taskInput.value = '';
    };
  
    function addTask(taskDescription) {
      let li = document.createElement('li');
      li.textContent = taskDescription;
      li.onclick = () => toggleComplete(li);

      let removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.onclick = () => removeTask(li);
      li.appendChild(removeButton);
  
      tasksListUL.appendChild(li);
  
      saveTasks();
    }
  
    function toggleComplete(taskLi) {
      taskLi.classList.toggle('completed');
      saveTasks();
    }

    function removeTask(taskLi) {
        tasksListUL.removeChild(taskLi);
        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(tasksListUL.children).map(li => {
          const textContent = li.firstChild.textContent;
          return textContent;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTask(task));
    }
  });
  

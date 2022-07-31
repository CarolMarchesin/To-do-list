
const inputElement = document.querySelector(".new-task-input");
const buttonAdd = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");


const validateInput = () => inputElement.value.trim().length > 0;


const handleAddTask = () => {                 /*função de adicionar tarefas*/
    const inputIsValidad = validateInput();

    if (!inputIsValidad) {
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement("div")
    taskItemContainer.classList.add("task-item")

    const taskContent = document.createElement("p")
    taskContent.innerText = inputElement.value;

    const deleteItem = document.createElement("i")
    deleteItem.classList.add("fa-solid")
    deleteItem.classList.add("fa-trash-can");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    console.log({taskItemContainer})

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) =>{       /*função de deletar as tarefas*/
    const tasks = tasksContainer.childNodes;   

    for(const task of tasks){
        if(task.firstChild.isSameNode(taskContent)){                   
            taskItemContainer.remove();
        } 
    }

    updateLocalStorage();
};

const handleInputChange = () => {                                /*função que verifica e valida o input*/ 
    const inputIsValidad = validateInput();

    if (inputIsValidad){
        return inputElement.classList.remove("error");
    }
};


const updateLocalStorage = () => {                            /*função para salvar as tarefas no localStorage, deixando em JSON*/ 
    const tasks = tasksContainer.childNodes;
  
    const localStorageTasks = [...tasks].map((task) => {
      const content = task.firstChild;
      const isCompleted = content.classList.contains("completed");
  
      return { description: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};


const refreshTasksUsingLocalStorage = () => {                                 /*função para salvar as tarefas dando refresh*/
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!tasksFromLocalStorage) return; 

    for(const task of tasksFromLocalStorage){
        const taskItemContainer = document.createElement("div")
        taskItemContainer.classList.add("task-item")

        const taskContent = document.createElement("p")
        taskContent.innerText = task.description;
        if (task.isCompleted){
            taskContent.classList.add('completed')
        }

        const deleteItem = document.createElement("i")
        deleteItem.classList.add("fa-solid")
        deleteItem.classList.add("fa-trash-can");

        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);

        console.log({taskItemContainer})

        tasksContainer.appendChild(taskItemContainer);
    }

};

refreshTasksUsingLocalStorage();


buttonAdd.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());


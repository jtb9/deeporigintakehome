import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { v4 as uuidv4 } from 'uuid';

const storage = createJSONStorage(() => sessionStorage)
export const tasksAtom = atomWithStorage('persistent-task-data', {
    tasks: []
}, storage)

export const newTaskID = () => {
    return uuidv4();
}

// store a new task in our atom
export const addTask = (id: string, payload: any, data: any, set: any) => {
    let newTask = {
        ...payload,
        id: id
    }

    let newData = {
        ...data
    }

    newData.tasks.push(newTask)

    set(newData);
}

// update a task with new info for it
export const updateTask = (id: string, updatedTask: any, data: any, set: any) => {
    let newData = {
        ...data
    }

    let newTasks = [];

    for (let i = 0; i < newData.tasks.length; i++) {
        if (newData.tasks[i].id !== id) {
            newTasks.push(newData.tasks[i]);
        }
        else {
            newTasks.push(updatedTask)
        }
    }

    newData.tasks = newTasks;

    set(newData);
}

// remove a single task by the given ID
export const deleteTask = (id: string, data: any, set: any) => {
    let newData = {
        ...data
    }

    let newTasks = [];

    for (let i = 0; i < newData.tasks.length; i++) {
        if (newData.tasks[i].id !== id) {
            newTasks.push(newData.tasks[i]);
        }
    }

    newData.tasks = newTasks;

    set(newData);
}

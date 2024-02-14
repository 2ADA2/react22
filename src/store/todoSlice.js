import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

            if (!response.ok){
                throw new Error('404')
            }

            const data = await response.json();
            return data;            
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

const todoSlice = createSlice ({
    name: 'todos',
    initialState:{
        todos:[],
        status:null,
        errpe:null,
    },

    reducers: {
        addTodo(state, action){
            state.todos.push({
                title: action.payload.text,
                id: new Date().toISOString(),
                completed: false
            })
        },
        delTodo(state, action){
            state.todos = state.todos.filter(todo => todo.id != action.payload.todoId);
            console.log(state.todos);
        },
        setTodoFinished(state, action){
            state.todos = state.todos.map(todo => {
                if (action.payload.todoID === todo.id) todo.completed = !todo.completed;
                return todo
            })
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.error = null;
                state.status = 'loading...';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
    }

});

export const {addTodo, delTodo, setTodoFinished} = todoSlice.actions;
export default todoSlice.reducer;
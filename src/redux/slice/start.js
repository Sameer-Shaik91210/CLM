import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";


export const StartProcess = createAsyncThunk("StartProcess", async (values) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  };
  const response = await fetch("/engine-rest/process-definition/key/Start/start", requestOptions);
  const result = await response.json();
  return result;
});

export const CompleteTask = createAsyncThunk("CompleteTask", async (taskId, values) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  };
  const response = await fetch(`/engine-rest/task/${taskId}/complete`, requestOptions);
  const result = await response.json();
  return result;
});

export const GetForm = createAsyncThunk("FormKey", async () => {
  const response = await fetch("/engine-rest/process-definition/key/Start/startForm")
  const result = await response.json();
  console.log(result)
  return result
})

export const FetchTasks = createAsyncThunk("FetchTasks", async () => {
  const response = await fetch("/engine-rest/task?sortBy=created&sortOrder=desc")
  const result = await response.json();
  console.log("Tasks" + result)
  return result
})



export const setClientNameAction = createAction("start/setClientNameAction", (payload) => {
  console.log("triggered setClientName");
  return { payload };
});

export const setVendorNameAction = createAction("start/setVendorNameAction", (payload) => {
  return { payload };
});

export const setCreateDateAction = createAction("start/setCreateDateAction", (payload) => {
  return { payload };
});

export const setEndingDateAction = createAction("start/setEndingDateAction", (payload) => {
  return { payload };
});
export const setAmountAction = createAction("start/setAmountAction", (payload) => {
  return { payload };
});

const start = createSlice({
  name: "start",
  initialState: {
    isloading: false,
    data: null,
    isError: false,
    FromKey: null,
    TaskList: null,
    clientName: '',
    vendorName: '',
    createDate: '',
    endingDate: '',
    amount: '',
    taskComplete: '',
  },
  extraReducers: (builder) => {
    builder.addCase(StartProcess.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(StartProcess.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = action.payload;
    })
    builder.addCase(StartProcess.rejected, (state, action) => {
      console.log("error", action.payload)
      state.isError = true;
    })
    builder.addCase(GetForm.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(GetForm.fulfilled, (state, action) => {
      state.isloading = false;
      state.FromKey = action.payload;
    })
    builder.addCase(GetForm.rejected, (state, action) => {
      console.log("error", action.payload)
      state.isError = true;
    })
    builder.addCase(FetchTasks.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(FetchTasks.fulfilled, (state, action) => {
      state.isloading = false;
      state.TaskList = action.payload;
    })
    builder.addCase(FetchTasks.rejected, (state, action) => {
      console.log("error", action.payload)
      state.isError = true;
    })
    builder
      .addCase(setClientNameAction, (state, action) => {
        console.log(action.payload);
        state.clientName = action.payload;
      })
      .addCase(setVendorNameAction, (state, action) => {
        state.vendorName = action.payload;
      });
    builder.addCase(setCreateDateAction, (state, action) => {
      state.createDate = action.payload;
    });
    builder.addCase(setEndingDateAction, (state, action) => {
      state.endingDate = action.payload;
    });
    builder.addCase(setAmountAction, (state, action) => {
      state.amount = action.payload;
    });

    builder.addCase(CompleteTask.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(CompleteTask.fulfilled, (state, action) => {
      state.isloading = false;
      state.taskComplete = action.payload;
    })
    builder.addCase(CompleteTask.rejected, (state, action) => {
      console.log("error", action.payload)
      state.isError = true;
    })
  }
})


export default start.reducer;



